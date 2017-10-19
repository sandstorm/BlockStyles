import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SelectBox} from '@neos-project/react-ui-components';
//import {getGuestFrameWindow} from '@neos-project/neos-ui-guest-frame/src/dom';
import {connect} from 'react-redux';
import {selectors} from '@neos-project/neos-ui-redux-store';
import {$get, $transform} from 'plow-js';

import styleDefinitions from './styleDefinitions';

const getGuestFrameWindow = () => {
	return document.getElementsByName('neos-content-main')[0].contentWindow;
};

@connect($transform({
	formattingUnderCursor: selectors.UI.ContentCanvas.formattingUnderCursor
}))
export default class BlockStyles extends PureComponent {
	render() {
		return (
			<div>
				{styleDefinitions.map(this.renderStyleDefinition)}
			</div>
		);
	}

	renderStyleDefinition = (styleDefinition) => {
		console.log('this.props.formattingUnderCursor', this.props.formattingUnderCursor);
		const classesList = $get(['Sandstorm.Blockstyles', 'classes'], this.props.formattingUnderCursor);

		const classesForOption = styleDefinition.options.map(it => it.value);
		const enabledClass = classesList && classesList.find(it => classesForOption.indexOf(it) !== -1);
		console.log("ENABLED", classesList, classesForOption, enabledClass);

		return <span>{styleDefinition.label}: <SelectBox options={styleDefinition.options} value={enabledClass} onValueChange={this.handleValueChange(styleDefinition.id)} /></span>;
	}

	handleValueChange = styleDefinitionId => value => {
		getGuestFrameWindow().NeosCKEditorApi.toggleFormat("Sandstorm.Blockstyles", {styleDefinitionId, value});
	}
}