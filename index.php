<?php
$_site = require_once(getenv("SITELOADNAME"));
$S = new SiteClass($_site);

$h->title = "Bonnie's Home Page";

[$top, $footer] = $S->getPageTopBottom($h);

echo <<<EOF
$top
<h2 class="center">My Own Home Page -- Oh Boy</h2>
<hr>
<a href="bridgeclub.php">Go To Bridge Club</a>
$footer
EOF;
