/** @format */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Post = sequelize.define("Post", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	tag: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

Post.belongsTo(User, { foreignKey: "authorId", onDelete: "CASCADE" });
User.hasMany(Post, { foreignKey: "authorId" });

module.exports = Post;
