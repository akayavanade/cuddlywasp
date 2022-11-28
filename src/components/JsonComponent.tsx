import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type JsonComponentProps = ComponentProps & {
  fields: {
    json: Field<string>;
  };
};

const JsonComponent = (props: JsonComponentProps): JSX.Element => (
  <div>
    <h2>JsonComponent Component</h2>
    <Text tag="section" field={props.fields.json} />
  </div>
);

export default withDatasourceCheck()<JsonComponentProps>(JsonComponent);
