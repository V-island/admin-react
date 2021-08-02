import React from 'react';
import UserComponent from './controls';

const TemplateCard = (props) => {
  const { schema } = props;
  const Card = UserComponent[schema.componentName];
  const newSchemas = schema.children || [];

  return (
    <Card {...schema.props}>
      {newSchemas.map((item, index) => (
        <TemplateCard key={index} schema={item} />
      ))}
    </Card>
  );
};

export default TemplateCard;
