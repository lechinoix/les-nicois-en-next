import development from './development';
import production from './production';

const config = {
	development,
	production
};

export default config[process.env.NODE_ENV];
