export function extractAllCssClassNames(styleDefinitions) {
	const cssClassNames = [];
	styleDefinitions.forEach(styleDefinition =>
		styleDefinition.options.forEach(option =>
			cssClassNames.push(option.value)
		)
	);

	return cssClassNames;
}

function concat(...args) {
	return args.reduce((acc, val) => [...acc, ...val], []);
}

export function findAllAppliedClassesExceptForOneStyleDefinition(styleDefinitionId, styleDefinitions, editor, CKEDITOR) {
	const classes = styleDefinitions.map(styleDefinition => {
		if (styleDefinition.id === styleDefinitionId) {
			return [];
		} else {
			const elementPath = editor.elementPath();

			return styleDefinition.options.map(option => {
				if (elementPath.block.hasClass(option.value)) {
					return option.value;
				} else {
					return null;
				}
			}).filter(Boolean); // remove empty values
		}
	});

	return concat(...classes);
}