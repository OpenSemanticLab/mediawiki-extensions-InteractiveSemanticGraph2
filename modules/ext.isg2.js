/*@nomin*/

(function () {

	/**
	 * @class mw.isg2
	 * @singleton
	 */
	mw.isg2 = {
	};

}());
$(document).ready(function () {
	if ($('.InteractiveSemanticGraph2').length === 0) return; //only on pages with a InteractiveSemanticGraph2-div

	mw.loader.load('https://unpkg.com/tabulator-tables@4.3.0/dist/css/tabulator.min.css', 'text/css');
	mw.loader.load('https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.10.0/jsoneditor.css', 'text/css');
	$.when(
		mw.loader.using('oojs-ui-core'),
		mw.loader.using('ext.mwjson.util'),
		mw.loader.using('ext.mwjson.api'),
		mw.loader.using('ext.isg2.graph'),
		$.getScript("https://unpkg.com/tabulator-tables@4.3.0/dist/js/tabulator.min.js"),
		$.getScript("https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.10.0/jsoneditor.min.js"),
		$.getScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"),
		$.Deferred(function (deferred) {
			$(deferred.resolve);
		})
	).done(function () {

		$('.InteractiveSemanticGraph2').each(function () {

			let defaultOptions = {
				smw_query: `
			[[Category:OSW494f660e6a714a1a9681c517bbb975da]]
			OR[[:Category:OSW494f660e6a714a1a9681c517bbb975da]]
			OR[[:Category:OSW92cc6b1a2e6b4bb7bad470dfdcfdaf26]]
			OR[[:Category:Item]]
			OR[[:Category:Entity]]
			OR[[:Category:Category]]
			`,
				root: "Category:OSW494f660e6a714a1a9681c517bbb975da"
			};
			var userOptions = {};

			if (this.dataset.config) userOptions = JSON.parse(this.dataset.config);
			var config = mwjson.util.mergeDeep(defaultOptions, userOptions);

			var options = {
				interaction: {
					hover: true,
					multiselect: true,
				},
				manipulation: {
					enabled: true,
				},
				physics: {
					stabilization: {
						enabled: true,
					},
					barnesHut: {
						gravitationalConstant: -40000,
						centralGravity: 0,
						springLength: 0,
						springConstant: 0.5,
						damping: 1,
						avoidOverlap: 0
					},
					maxVelocity: 5
				},
				edges: {
					arrows: "to",

				},
				groups: {
					useDefaultGroups: false
				}
			}

			let pages = mwjson.api.getPagesFromAskQuery(config.smw_query)
				.then(pages => {
					console.log(pages);

					let data = {
						jsonschema: {},
						jsondata: {}
					}
					for (var page of pages) {
						for (const key of ['jsondata', 'jsonschema']) {
							if (page.slots[key]) {
								if (mwjson.util.isString(page.slots[key])) page.slots[key] = JSON.parse(page.slots[key]);
								data[key][page.title] = page.slots[key];
							}
						}
					}
					console.log(data);

					let args = {
						file: data,
						depth: 1,
						mode: true,
						// nodes: nodes,
						// edges: edges,
						rootItem: config.root,
						recursionDepth: 1,
					}

					let drawer = new isg.GraphDrawer(drawer_config = { lang: "en", contractArrayPaths: true }, args);
					let tool_config = {
						// nodes: nodes,
						// edges: edges,
						options: options,
						file: data,
						drawer: drawer,
						// clone: clone,
					};
					let graphtool = new isg.GraphTool("mynetwork", tool_config);
				});
		});
	});
});   
