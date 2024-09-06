import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SectionTitle({ text, icon, isCollapsed }) {
  return (
    <div className="section-title">
      <FontAwesomeIcon icon={icon} color="var(--text-faint)" size="xs" />
      <span className={`section-text ${isCollapsed ? "collapsed" : ""}`}>
        {text}
      </span>
    </div>
  );
}

export default SectionTitle;
