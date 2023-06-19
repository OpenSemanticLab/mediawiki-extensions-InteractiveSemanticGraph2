<?php
/**
 * Hooks for InteractiveSemanticGraph2 extension
 *
 * @file
 * @ingroup Extensions
 */

class InteractiveSemanticGraph2Hooks {

	public static function onParserFirstCallInit( Parser &$parser ) {
		#$parser->setFunctionHook( 'interactivesemanticgraph', 'InteractiveSemanticGraph2Hooks::interactivesemanticgraph' );
	}

	public static function interactivesemanticgraph( Parser &$parser )
	{
		// Called in MW text like this: {{#interactivesemanticgraph: }}

		// For named parameters like {{#interactivesemanticgraph: foo=bar | apple=orange | banana }}
		// See: https://www.mediawiki.org/wiki/Manual:Parser_functions#Named_parameters

		return "This text will be shown when calling this in MW text.";
	}

	public static function onBeforePageDisplay( $out ) {

		$out->addModules( 'ext.isg2' );

		return true;

	}
}
