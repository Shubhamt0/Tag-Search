module.exports = (sequelize, Sequelize) => {
	const Tags = sequelize.define('Tags', {
	  Tag_Name: {
		type: Sequelize.TEXT
	  },
	  Description: {
		type: Sequelize.TEXT
	  }
	});
	
	return Tags;
}