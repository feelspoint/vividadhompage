// Keep the Google Analytics configuration in its separate HTML file.
(function() {
	var tagUrl = new URL('../../google_analytics_tag_20260914.html', document.currentScript.src);

	fetch(tagUrl, { cache: 'no-store' })
		.then(function(response) {
			if (!response.ok)
				throw new Error('Analytics tag request failed: ' + response.status);

			return response.text();
		})
		.then(function(html) {
			var template = document.createElement('template');
			template.innerHTML = html;

			// Scripts parsed as HTML are inert; recreate them to execute the tag.
			template.content.querySelectorAll('script').forEach(function(source) {
				var script = document.createElement('script');
				Array.from(source.attributes).forEach(function(attribute) {
					script.setAttribute(attribute.name, attribute.value);
				});
				if (source.hasAttribute('src'))
					script.src = new URL(source.getAttribute('src'), tagUrl).href;
				script.textContent = source.textContent;
				document.head.appendChild(script);
			});
		})
		.catch(function(error) {
			console.warn('Google Analytics could not be loaded.', error);
		});
})();
