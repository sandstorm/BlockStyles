export function findAllAppliedClassesExceptForOneStyleDefinition(styleDefinitionId, blockStylePreset, editor, CKEDITOR) {
    const elementPath = editor.elementPath();

    const classNames = Object.entries(blockStylePreset).map(([key, value]) => {
    	if (key === styleDefinitionId) {
    		return null;
		}

    	return Object.keys(value.options).find(className => elementPath.block.hasClass(className));
	}).filter(Boolean);

	return classNames;
}