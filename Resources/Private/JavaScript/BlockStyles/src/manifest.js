import manifest from '@neos-project/neos-ui-extensibility';

import BlockStyles from './BlockStyles.js';
import styleDefinitions, {extractAllCssClassNames, findAllAppliedClassesExceptForOneStyleDefinition} from './styleDefinitions';

const cssClassnamesInStyleDefinitions = extractAllCssClassNames(styleDefinitions);

manifest('Sandstorm.BlockStyles', {}, globalRegistry => {
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
	formattingRules.set('Sandstorm.Blockstyles', {
		applyStyleFn: (formattingOptions, editor, CKEDITOR) => {
			const {styleDefinitionId, value} = formattingOptions;

			const classesToBePreserved = findAllAppliedClassesExceptForOneStyleDefinition(styleDefinitionId, styleDefinitions, editor, CKEDITOR);

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
		config: formattingRules.config.addToExtraAllowedContent(cssClassnamesInStyleDefinitions.map(cssClassName => `p(${cssClassName})`).join(';')),

	});
});
