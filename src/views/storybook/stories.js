export const getComponenent = (Template, args) =>{
    const Component = Template.bind({});
    Component.args = args;
    return Component;
}
