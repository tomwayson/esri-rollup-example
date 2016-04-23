import test from 'ava';
import utils from '../../src/app/utils';

test('capitalize', t => {
  t.is(utils.formatTitle('my-service-name'), 'My Service Name');
});
