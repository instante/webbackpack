<?php
$manifestFile = __DIR__ . '/manifest.json';
if (!file_exists($manifestFile)) {
    echo "Missing file $manifestFile. Run webpack or compile.sh or see readme.md";
    die();
}
$manifest = json_decode(file_get_contents($manifestFile), true);
?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Webbackpack demo</title>
    <link rel="stylesheet" href="<?php echo htmlspecialchars($manifest['css/style.css']); ?>">
</head>
<body>
<div class="container">
    <h1 class="demo-heading">Welcome to webbackpack demo</h1>
    <p>If the heading is light blue, compilation of SCSS and inclusion of CSS result works.</p>
    <p>
        The main purpose of Webbackpack is to provide a scheme for mounting JavaScript,
        TypeScript and React.js components into a backend-generated HTML page.
    </p>
    <p>
        There are several ways to mount a javascript:
    </p>
    <h3>
        Inline JSON
    </h3>
<pre>&lt;script type=&quot;application/json&quot; class=&quot;<strong>js-module-loader</strong>&quot;&gt;
    [&quot;<strong>demo/Tumbleweed</strong>&quot;]
&lt;/script&gt;
</pre>
    <script type="application/json" class="js-module-loader">
        ["demo/Tumbleweed"]
    </script>
    <p>Content of the JSON is an array: yes, you can specify multiple modules in the array this way.
        There are two important parts of the code snippet:</p>
    <ol>
        <li><strong>js-module-loader</strong> class tells the bootstrapping script to parse content of this script tag.</li>
        <li><strong>demo/Tumbleweed</strong> refers to a module inside <code>src/ts/view/<strong>demo/Tumbleweed</strong>.js</code>.
            Note that the module is nested in the <code>view</code> folder. All modules
            included by Webbackpack into HTML should be placed in that folder,
            to distinguish which modules are intended to be used that way.
        </li>
    </ol>
    <h3>
        Passing arguments and binding elements
    </h3>
    <h4>HTML snippet</h4>
<pre>
&lt;div id=&quot;writing-board&quot;&gt;&lt;/div&gt;
&lt;script type=&quot;application/json&quot; class=&quot;js-module-loader&quot;&gt;
    [{
        &quot;module&quot;: &quot;demo/Write&quot;,
        &quot;data&quot;: {
            &quot;message&quot;: &quot;Hell-o-world!&quot;,
            &quot;color&quot;: &quot;#f00&quot;
        },
        &quot;element&quot;: &quot;writing-board&quot;
    }]
&lt;/script&gt;
</pre>
    <h4>The JS module</h4>
    <pre>export function Write(data, element) {
    element.innerText = data.message;
    element.style.color = data.color;
}
</pre>
    <h4>Demo</h4>
    <div id="writing-board"></div>
    <script type="application/json" class="js-module-loader">
        [{
            "module": "demo/Write",
            "data": {
                "message": "Hell-o-world!",
                "color": "#f00"
            },
            "element": "writing-board"
        }]
    </script>
    <p>As you can see, the <code>data</code> attribute is passed to the module (or constructor, if the module is a TypeScript class) as its first argument.</p>
    <p>Html element of <code>id="writing-board"</code> is passed in a second argument.</p>
    <h2>Binding to element using an attribute</h2>
<pre>&lt;div class=&quot;js-module-loader&quot; data-module=&quot;demo/Write&quot; data-module-data='{
    &quot;message&quot;: &quot;Goodbye, world!&quot;,
    &quot;color&quot;: &quot;#009&quot;
}'&gt;&lt;/div&gt;</pre>
    <div class="js-module-loader" data-module="demo/Write" data-module-data='{
        "message": "Goodbye, world!",
        "color": "#009"
    }'></div>
    <p>
        This is a shorcut to bind a module to an element.
        <strong>This should be the preferred way</strong>,
        especially when the module receives no data, as it is shorter
        and does not require to use IDs for elements.
    </p>
    <p>
        The <code>js-module-loader</code> class must be present too.
        This is because we've found out that searching for elements
        in page by class name is significantly faster than by data
        attribute.
    </p>

    <h2>Using React and Typescript</h2>
    <p>You can (and are recommended to) use TypeScript with ES2015 features
        instead of pure ES5 JavaScript for writing modules, just use <code>.ts</code>
        instead of <code>.js</code>.
        Files with extension <code>.tsx</code> syntax for React syntax extension are
        supported too.
    </p>
<pre>&lt;div class=&quot;js-module-loader&quot; <strong>data-react-module</strong>=&quot;demo/ReactButton&quot; data-module-data='{
    &quot;label&quot;: &quot;The React Button: &quot;
}'&gt;&lt;/div&gt;</pre>
    <div class="js-module-loader" data-react-module="demo/ReactButton" data-module-data='{
        "label": "The React Button: "
    }'></div>
    <p>Note that you have to use <code>data-react-module</code> attribute instead of <code>data-module</code>.</p>
    <p>See the <code>ReactButton.tsx</code> code for details how TS/React module is written.</p>

    <h4>Including React module using inline json</h4>
<pre>&lt;div id=&quot;reactbutton&quot;&gt;&lt;/div&gt;
&lt;script type=&quot;application/json&quot; class=&quot;js-module-loader&quot;&gt;
    [{
        &quot;module&quot;: &quot;demo/ReactButton&quot;,
        &quot;data&quot;: {
            &quot;label&quot;: &quot;Another React Button: &quot;
        },
        &quot;reactRoot&quot;: &quot;reactbutton&quot;
    }]
&lt;/script&gt;</pre>
    <div id="reactbutton"></div>
    <script type="application/json" class="js-module-loader">
        [{
            "module": "demo/ReactButton",
            "data": {
                "label": "Another React Button: "
            },
            "reactRoot": "reactbutton"
        }]
    </script>
</div>
<script type="text/javascript" src="<?php echo htmlspecialchars($manifest['js/script.js']); ?>"></script>
</body>
</html>
