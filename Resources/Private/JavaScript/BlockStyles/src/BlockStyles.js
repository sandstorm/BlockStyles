import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SelectBox} from '@neos-project/react-ui-components';
//import {getGuestFrameWindow} from '@neos-project/neos-ui-guest-frame/src/dom';
import {connect} from 'react-redux';
import {selectors} from '@neos-project/neos-ui-redux-store';
import {$get, $transform} from 'plow-js';
import {neos} from '@neos-project/neos-ui-decorators';

const getGuestFrameWindow = () => {
	return document.getElementsByName('neos-content-main')[0].contentWindow;
};

@connect($transform({
	formattingUnderCursor: selectors.UI.ContentCanvas.formattingUnderCursor,
    focusedNodeType: selectors.CR.Nodes.focusedNodeTypeSelector,
    currentlyEditedPropertyName: selectors.UI.ContentCanvas.currentlyEditedPropertyName

}))
@neos(globalRegistry => ({
    frontendConfiguration: globalRegistry.get('frontendConfiguration'),
    nodeTypesRegistry: globalRegistry.get('@neos-project/neos-ui-contentrepository')
}))
export default class BlockStyles extends PureComponent {

	render() {
		const {
            focusedNodeType,
            currentlyEditedPropertyName,

            frontendConfiguration,
			nodeTypesRegistry,

		} = this.props;
        const inlineEditorOptions = nodeTypesRegistry
            .getInlineEditorOptionsForProperty(focusedNodeType, currentlyEditedPropertyName);

        const blockStylePresetName = $get(['formatting', 'Sandstorm.BlockStyles'], inlineEditorOptions);

        const stylePresets = frontendConfiguration.get('Sandstorm.BlockStyles:presets');

        const blockStylePreset = stylePresets[blockStylePresetName];
        if (!blockStylePreset) {
        	return null;
		}

		return (
			<div>
				{Object.entries(blockStylePreset).map(it => this.renderStyleDefinition(it, blockStylePresetName))}
			</div>
		);
	}

	renderStyleDefinition = ([styleDefinitionId, styleDefinition], blockStylePresetName) => {
		const classesList = $get(['Sandstorm.BlockStyles', 'classes'], this.props.formattingUnderCursor);

		const classesForOption = Object.keys(styleDefinition.options);
		const enabledClass = classesList && classesList.find(it => classesForOption.indexOf(it) !== -1);
		const options = Object.entries(styleDefinition.options).map(([key, option]) => ({
			value: key,
			...option
		}));

		return <SelectBox key={styleDefinitionId} options={options} value={enabledClass} onValueChange={this.handleValueChange(styleDefinitionId, blockStylePresetName)} />;
	}

	handleValueChange = (styleDefinitionId, blockStylePresetName) => value => {
		getGuestFrameWindow().NeosCKEditorApi.toggleFormat("Sandstorm.BlockStyles", {blockStylePresetName, styleDefinitionId, value});
	}
}