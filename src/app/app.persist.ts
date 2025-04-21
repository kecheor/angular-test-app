import { persistState } from '@datorama/akita';
const storage = persistState();
const providers = [{ provide: 'persistStorage', useValue: storage }];

export default providers;
