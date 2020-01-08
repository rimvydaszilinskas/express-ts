import { Sequelize, Model, DataType, DataTypes, InitOptions } from 'sequelize';
import bcryptjs from 'bcryptjs';

class User extends Model {
    public id!: number;
    public firstName?: string;
    public lastName?: string;
    public username!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    verifyPassword(password: string) {
        return bcryptjs.compareSync(password, this.password)
    };
}

export default User;

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
        },
        password: {
            type: DataTypes.STRING(256),
            allowNull: false
        }
    }, {
        tableName: 'users',
        sequelize: SequelizeInstance,
        hooks: {
            beforeCreate: (user: User) => {
                user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync(10))
            }
        }
    });
};
