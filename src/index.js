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
    for (let value of heroSkillsList) {
      let heroModel = {};
      let skillList = [];
      for (let key in value) {
        heroModel = value[key].info;
        heroModel.hid = key;
        heroModel.tags = value[key].tags.join(' ');
        heroModel.cName = value[key].cName;
        heroModel.title = value[key].title;
        skillList = value[key].skills;
      }
      await model.addHero(heroModel);
      for (let ele of skillList) {
        let heroSkillModel = ele;
        heroSkillModel.hid = heroModel.hid;;
        await model.addHeroSkill(heroSkillModel);
      }
    }
    await model.endConnection();
  }
}

const app = new LOLDataGrabber();
app.start();
