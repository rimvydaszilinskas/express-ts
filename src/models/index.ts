import { Sequelize as SequelizeNode} from 'sequelize';
import User, { initUser } from './user';

const Sequelize: SequelizeNode = new SequelizeNode(
    'typescript', 'typescript', 'password', {
        dialect: 'postgres',
        host: 'localhost'
    }
);

// Initialize models here
initUser(Sequelize);

export default Sequelize;

// Add all models to be able to import it from one source
export { User };
