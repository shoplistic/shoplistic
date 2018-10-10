import { Router } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';
import * as path from 'path';

const swaggerDoc = yaml.load(path.join(process.cwd(), 'shopper.openapi.yml'));
const router = Router();

const DisableTryItOut = function() {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false
        }
      }
    }
  }
}

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDoc, {
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    plugins: [
      DisableTryItOut
    ]
  }
}));

export = router;
