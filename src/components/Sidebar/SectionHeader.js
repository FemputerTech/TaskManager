import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Sidebar/SectionHeader.css";

function SectionHeader({ text, icon, isCollapsed }) {
  return (
    <div className="section-header">
      <FontAwesomeIcon
        className="section-icon"
        icon={icon}
        color="var(--text-faint)"
        size="xs"
      />
      <span className={`section-header-text ${isCollapsed ? "collapsed" : ""}`}>
        {text}
      </span>
    </div>
  );
}

export default SectionHeader;
