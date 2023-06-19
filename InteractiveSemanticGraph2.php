<?php

if ( function_exists( 'wfLoadExtension' ) ) {
	wfLoadExtension( 'InteractiveSemanticGraph2' );
	// Keep i18n globals so mergeMessageFileList.php doesn't break
	$wgMessagesDirs['InteractiveSemanticGraph2'] = __DIR__ . '/i18n';
	$wgExtensionMessagesFiles['InteractiveSemanticGraph2Alias'] = __DIR__ . '/InteractiveSemanticGraph2.i18n.alias.php';
	$wgExtensionMessagesFiles['InteractiveSemanticGraph2Magic'] = __DIR__ . '/InteractiveSemanticGraph2.i18n.magic.php';
	wfWarn(
		'Deprecated PHP entry point used for InteractiveSemanticGraph2 extension. Please use wfLoadExtension ' .
		'instead, see https://www.mediawiki.org/wiki/Extension_registration for more details.'
	);
	return true;
} else {
	die( 'This version of the InteractiveSemanticGraph2 extension requires MediaWiki 1.25+' );
}
