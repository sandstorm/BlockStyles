import manifest from '@neos-project/neos-ui-extensibility';

import BlockStyles from './BlockStyles.js';
import {findAllAppliedClassesExceptForOneStyleDefinition} from './styleDefinitions';

manifest('Sandstorm.BlockStyles', {}, (globalRegistry, {frontendConfiguration}) => {
	const stylePresets = frontendConfiguration['Sandstorm.BlockStyles:presets'];

	const richtextToolbar = globalRegistry.get('ckEditor').get('richtextToolbar');
	richtextToolbar.set('BlockStyles', {
		component: BlockStyles,
		callbackPropName: 'onSelect',
		isVisibleWhen: () => true
	});

	const formattingRules = globalRegistry.get('ckEditor').get('formattingRules');

	/**
	 * Shorthand add* method to ease creation of custom styles
	 */
	formattingRules.set('Sandstorm.BlockStyles', {
		applyStyleFn: (formattingOptions, editor, CKEDITOR) => {
			const {blockStylePresetName, styleDefinitionId, value} = formattingOptions;

            const blockStylePreset = stylePresets[blockStylePresetName];

			const classesToBePreserved = findAllAppliedClassesExceptForOneStyleDefinition(styleDefinitionId, blockStylePreset, editor, CKEDITOR);

			var style = new CKEDITOR.style({
				element: 'p',
				attributes: {
					class: [...classesToBePreserved, value].join(' '),
				}
			});
			editor.applyStyle(style);
		},
		extractCurrentFormatFn: (editor, CKEDITOR) => {
			const elementPath = editor.elementPath();
			if (elementPath && elementPath.block) {
				const classNames = elementPath.block.getAttribute('class');
				return {classes: classNames && classNames.split(' ')};
			}
			return null;
		},
		config: (configSoFar, formattingEditorOptions) => {
		    const blockStylePresetName = formattingEditorOptions;
		    const blockStylePreset = stylePresets[blockStylePresetName];
		    const classNames = [].concat(...Object.keys(blockStylePreset).map(k => Object.keys(blockStylePreset[k].options)));
		    return formattingRules.config.addToExtraAllowedContent(classNames.map(cssClassName => `p(${cssClassName})`).join(';'))(configSoFar);
        }

	});
});
