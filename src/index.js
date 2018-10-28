import { getSource } from './grabber';
import GlobalConfig from './config.js';
import { model } from './model';
const analyzer = require('./analyzer');

class LOLDataGrabber {
  constructor() {}
  async start() {
    const frontPage = await getSource(GlobalConfig.index_path);
    const heroIdList = analyzer.analyzeFrontPage(frontPage);
    const heroSkillsList = [];
    for (let i = 0; i < GlobalConfig.hero_num; ++i) {
      const path = GlobalConfig.hero_path + heroIdList[i] + '.js';
      const heroPage = await getSource(path);
      let data = {};
      data[heroIdList[i]] = analyzer.analyzeHeroPage(heroPage);
      heroSkillsList.push(data);
    }
    heroSkillsList.forEach(async (value) => {
      let heroModel = {};
      let skillList = [];
      for (let key in value) {
        heroModel = value[key].info;
        heroModel.hid = key;
        skillList = value[key].skills;
      }
      // console.log(heroModel);
      await model.addHero(heroModel);
      skillList.forEach(async (ele) => {
        let heroSkillModel = ele;
        heroSkillModel.hid = heroModel.hid;
        // console.log(heroSkillModel);
        await model.addHeroSkill(heroSkillModel);
      });
    });
    setTimeout(async () => await model.endConnection(), 1000);
  }
}

const app = new LOLDataGrabber();
app.start();
