import { backEnd$, BackEnd } from './backEnd';

interface Config {
  backEnd: BackEnd;
}
const config = (_config: Config) => {
  backEnd$.next(_config.backEnd);
};
export default config;
