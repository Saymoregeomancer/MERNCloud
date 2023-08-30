const DynamicComponent = ({ component, ...rest }) => {
  const Component = component; // Назва компонента передається в пропсі
  // console.log(component)

  return <Component {...rest} />;
};

export default DynamicComponent;
