const DynamicComponent = ({ component, ...rest }) => {
  const Component = component; 

  return <Component {...rest} />;
};

export default DynamicComponent;
