import { Router } from 'express';
import * as yaml from 'yamljs';
import * as path from 'path';
// @ts-ignore
import * as swaggerUi from 'swagger-ui-express';

const swaggerDoc = require(path.join(process.cwd(), 'shoplistic.openapi.json'));
const router = Router();

const DisableTryItOut = () => {
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
  customCss: '.swagger-ui .topbar, .response-col_links { display: none }',
  swaggerOptions: {
    plugins: [
      DisableTryItOut
    ]
  }
}));

router.get('/json', (_req, res) => {
  res.status(200).json(swaggerDoc);
});

router.get('/yaml', (_req, res) => {
  res.header('Content-Type', 'text/yaml');
  res.status(200).send(yaml.stringify(swaggerDoc, 100, 2));
});

export = router;
