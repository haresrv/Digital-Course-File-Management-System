import React from 'react';
import { Button} from 'react-bootstrap';
import './LoaderButton.css';

export default ({ isLoading, text, loadingText, className = '', disabled = false, ...props }) => (
	<Button className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
		{isLoading && <i className="fa fa-fw fa-refresh spinning" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />}
		{!isLoading ? text : loadingText}
	</Button>
);
