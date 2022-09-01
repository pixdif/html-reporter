import util from 'util';
import rimrafAsync from 'rimraf';

const rimraf = util.promisify(rimrafAsync);

export default rimraf;
