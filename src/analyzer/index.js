const iconv = require('iconv-lite');

exports.analyzeFrontPage = function(frontBuffer) {
  const frontPage = iconv.decode(Buffer.concat(frontBuffer), 'utf-8');
  eval(frontPage);
  const heroList = [];
  for (let key in LOLherojs.champion.keys) {
    heroList.push(LOLherojs.champion.keys[key]);
  }
  return heroList;
}

exports.analyzeHeroPage = function(heroBuffer) {
  const heroPage = iconv.decode(Buffer.concat(heroBuffer), 'utf-8');
  eval(heroPage);
  for (let key in LOLherojs.champion) {
    const skills = [];
    LOLherojs.champion[key].data.spells.forEach((ele) => {
      const newSkill = {
        id: ele.id,
        name: ele.name,
        description: ele.description
      };
      skills.push(newSkill);
    });
    return {
      skills: skills,
      info: LOLherojs.champion[key].data.info
    }
  }
}
