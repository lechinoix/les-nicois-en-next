import development from './development';
import production from './production';
import test from './test';

const config = {
	development,
	production,
	test
};

export default config[process.env.NODE_ENV];
