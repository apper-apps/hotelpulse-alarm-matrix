import * as Icons from "lucide-react";

const ApperIcon = ({ name, ...props }) => {
    const IconComponent = Icons[name] || Icons.Smile;
    if (!Icons[name]) {
        console.warn(`Icon "${name}" does not exist in lucide-react`);
    }
    return <IconComponent {...props} />;
};

export default ApperIcon;