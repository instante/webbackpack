import * as $ from "jquery";
import * as container from "./ClassExporter";
import * as React from "react";
import * as ReactDOM from "react-dom";

export interface JsonModuleDefinition {
    module:string;
    data:any;
    reactRoot?:string;
    element?:string;
}

export interface Module {
    className:string;
    isReact:boolean;
    data:any;
    element?:Element;
}

export class ModuleInitializer {
    static readonly LAYOUT_PREFIX:string = "view/";

    constructor() {
        this.init();
        $(document).on('snippets.redrawn', this.init.bind(this));
    }

    runModule(moduleDefinition:Module):void {
        console.debug('running module: ', moduleDefinition);
        if (container.hasOwnProperty(moduleDefinition.className)) {
            const module = (<any>container)[moduleDefinition.className];
            if (moduleDefinition.isReact) {
                ReactDOM.render(
                    React.createElement(module, moduleDefinition.data, null),
                    moduleDefinition.element || null
                );
            } else {
                new module(moduleDefinition.data, moduleDefinition.element);
            }
        } else {
            console.warn('Missing TS module ' + moduleDefinition.className);
        }
    }

    private init() {
        this.initModulesFromScriptHolders();
        this.initModulesFromTags();
    }

    private initModulesFromScriptHolders() {
        const scriptHolders: Array<HTMLElement> = $("script.js-module-loader[type='application/json']").toArray();
        scriptHolders.forEach((element: HTMLElement): void => {
            if (this.checkLoadedOnce(element)) {
                return;
            }
            const definitions: Array<JsonModuleDefinition | string> = JSON.parse(element.innerHTML);
            definitions.forEach((definition: JsonModuleDefinition | string) => {
                if (typeof definition === "string") {
                    this.runModule({
                        className: this.getClassNameFromPath(definition),
                        data: null,
                        isReact: false
                    });
                } else {
                    const elementId = definition.hasOwnProperty('reactRoot') ? definition.reactRoot : definition.element;
                    this.runModule({
                        className: this.getClassNameFromPath(definition.module),
                        isReact: definition.hasOwnProperty('reactRoot'),
                        data: definition.data,
                        element: elementId ? document.getElementById(elementId) || undefined : undefined,
                    });
                }
            });
        });
    }

    private initModulesFromTags() {
        const scriptHolders: Array<HTMLElement> = $('.js-module-loader:not(script)').toArray();
        scriptHolders.forEach((element: HTMLElement): void => {
            const $element = $(element);
            const isReact = Boolean($element.attr('data-react-module'));
            const dataAttr = $element.attr('data-module-data');
            this.runModule({
                className: this.getClassNameFromPath(isReact ? $element.attr('data-react-module') : $element.attr('data-module')),
                data: dataAttr ? JSON.parse($element.attr('data-module-data')) : null,
                isReact: isReact,
                element: element
            });
        });
    }

    private getClassNameFromPath(path:string):string {
        return path ? path.replace(ModuleInitializer.LAYOUT_PREFIX, "").replace(/\//g, '_') : "";
    }

    private checkLoadedOnce(element:any) {
        if (element.__ts_loaded) {
            return true;
        } else {
            element.__ts_loaded = true;
            return false;
        }
    }
}
