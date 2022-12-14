'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">feedball-project documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' : 'data-target="#xs-components-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' :
                                            'id="xs-components-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' }>
                                            <li class="link">
                                                <a href="components/AdminPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeedMainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeedMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InMatchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InMatchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LeaderboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeaderboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PollsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PollsPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' : 'data-target="#xs-injectables-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' :
                                        'id="xs-injectables-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' : 'data-target="#xs-pipes-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' :
                                            'id="xs-pipes-links-module-AppModule-0a64133bf6a6fafb8a6b06dfd1ee3784fde7874419aef14d33f7dac00b82b4e9fdc84e0fa7cbc30e08088b59dd2b64eeca6553d618597adfe048c9b6f965d21f"' }>
                                            <li class="link">
                                                <a href="pipes/DisplayMessagesOnlyFromCurrentMatchPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisplayMessagesOnlyFromCurrentMatchPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterTeamOnlyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterTeamOnlyPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/HoursMinutesPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HoursMinutesPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/IsUserInDisikedListPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsUserInDisikedListPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/IsUserInLikedListOfMessagePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsUserInLikedListOfMessagePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/IsUserInLikedListPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsUserInLikedListPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PluralPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PluralPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReturnCurrentMatchIdPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReturnCurrentMatchIdPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReturnCurrentMatchPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReturnCurrentMatchPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReturnFinishedMatchPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReturnFinishedMatchPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReturnIfXthPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReturnIfXthPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReturnRankUserPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReturnRankUserPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReturnSizePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReturnSizePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReturnUserPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReturnUserPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReturnXthPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReturnXthPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SortByDatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SortByDatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SortDateDescendingPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SortDateDescendingPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SortTeamFirstPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SortTeamFirstPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ToDatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToDatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ToDatePipe2.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToDatePipe2</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TransformPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransformPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/UidContainsListPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UidContainsListPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChartService.html" data-type="entity-link" >ChartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HighchartService.html" data-type="entity-link" >HighchartService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/chartModal.html" data-type="entity-link" >chartModal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeaderboardElems.html" data-type="entity-link" >LeaderboardElems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/matches.html" data-type="entity-link" >matches</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/messages.html" data-type="entity-link" >messages</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/News.html" data-type="entity-link" >News</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Polls.html" data-type="entity-link" >Polls</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});