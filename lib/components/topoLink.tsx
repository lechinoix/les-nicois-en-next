import { TopoSource } from '~/config/constants';
import type { Topo } from '~/config/types';

type PropsType = { topo: Topo }

const getSourceName = (source: string) => {
  if (source === TopoSource.C2C) return "CamptoCamp";
	if (source === TopoSource.Skitour) return 'Skitour';

	return 'Topo'
}

export default ({ topo }: PropsType) => (
	<a href={topo.url} target="_blank">
		{getSourceName(topo.source)}
	</a>
)
