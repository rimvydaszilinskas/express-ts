import { Sequelize, Model, DataType, DataTypes } from 'sequelize';

export default class User extends Model {
    public id!: number;
    public firstName?: string;
    public lastName?: string;
    public username!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initUser(SequelizeInstance: Sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        username: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'users',
        sequelize: SequelizeInstance
    });
};
