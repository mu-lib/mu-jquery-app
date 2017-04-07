# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="15.1.0"></a>
# [15.1.0](https://github.com/mu-lib/mu-jquery-app/compare/v15.0.1...v15.1.0) (2017-04-07)


### Features

* bumped deps ([5e684cc](https://github.com/mu-lib/mu-jquery-app/commit/5e684cc))


### BREAKING CHANGES

* `mu-jquery-crank/collect` has been deprecated in favor of `mu-jquery-capture/capture` that is now included in the bundle



<a name="15.0.1"></a>
## [15.0.1](https://github.com/mu-lib/mu-jquery-app/compare/v15.0.0...v15.0.1) (2017-04-07)


### Bug Fixes

* bumped deps ([8d37266](https://github.com/mu-lib/mu-jquery-app/commit/8d37266))



<a name="15.0.0"></a>
# [15.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v14.0.1...v15.0.0) (2017-04-06)


### Bug Fixes

* bumped deps ([9117651](https://github.com/mu-lib/mu-jquery-app/commit/9117651))
* bumped deps ([588c5fe](https://github.com/mu-lib/mu-jquery-app/commit/588c5fe))
* remove CJS bundle (as it's broken) ([155901d](https://github.com/mu-lib/mu-jquery-app/commit/155901d))
* use Array.prototype over [] ([d787b05](https://github.com/mu-lib/mu-jquery-app/commit/d787b05))


### Features

* bump deps ([fc6c1a7](https://github.com/mu-lib/mu-jquery-app/commit/fc6c1a7))


### BREAKING CHANGES

* mu-jquery-loom bumps a few other deps that break how async initialize events work. If you have an async event you should wrap your handler in `mu-jquery-crank/collect` in order for it to be used when constructing the final promise.



<a name="14.0.1"></a>
## [14.0.1](https://github.com/mu-lib/mu-jquery-app/compare/v14.0.0...v14.0.1) (2017-03-28)


### Bug Fixes

* AMD fix ([49ca8d2](https://github.com/mu-lib/mu-jquery-app/commit/49ca8d2))



<a name="14.0.0"></a>
# [14.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v13.1.0...v14.0.0) (2017-03-22)


### Features

* bumped mu-jquery-widget ([0924c68](https://github.com/mu-lib/mu-jquery-app/commit/0924c68))


### BREAKING CHANGES

* `finalize` no longer removes handlers so you have to do it yourselfe with `.off()`



<a name="13.1.0"></a>
# [13.1.0](https://github.com/mu-lib/mu-jquery-app/compare/v13.0.1...v13.1.0) (2017-03-19)


### Features

* bumped deps ([8d77140](https://github.com/mu-lib/mu-jquery-app/commit/8d77140))



<a name="13.0.1"></a>
## [13.0.1](https://github.com/mu-lib/mu-jquery-app/compare/v13.0.0...v13.0.1) (2017-03-19)


### Bug Fixes

* bump deps ([f9cc597](https://github.com/mu-lib/mu-jquery-app/commit/f9cc597))



<a name="13.0.0"></a>
# [13.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v12.0.0...v13.0.0) (2017-03-19)


* bump mu-jquery-widget@11.0.0 and remove create ([49ae434](https://github.com/mu-lib/mu-jquery-app/commit/49ae434))


### BREAKING CHANGES

* `mu-jquery-app/create` is now deprecated. Use `mu-jquery-widget/widget` instead.



<a name="12.0.0"></a>
# [12.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v11.0.0...v12.0.0) (2017-03-18)


### Bug Fixes

* **packaging:** bumped deps ([a4b66c7](https://github.com/mu-lib/mu-jquery-app/commit/a4b66c7))


### BREAKING CHANGES

* **packaging:** Overlapping rules and specs are now filtered



<a name="11.0.0"></a>
# [11.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v10.0.0...v11.0.0) (2017-01-23)


### Features

* move widget._remove logic ([ea6605a](https://github.com/mu-lib/mu-jquery-app/commit/ea6605a))


### BREAKING CHANGES

* no more need for `mu-jquery-app/widget`, just use `mu-jquery-widget/widget`.



<a name="10.0.0"></a>
# [10.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v9.0.2...v10.0.0) (2017-01-23)


### Features

* move hub functionality to separate package ([#3](https://github.com/mu-lib/mu-jquery-app/issues/3)) ([ed9734e](https://github.com/mu-lib/mu-jquery-app/commit/ed9734e))


### BREAKING CHANGES

* As this excludes `mu-jquery-hub` and all `hub` related functionality the user must now install that themselves.



<a name="9.0.2"></a>
## [9.0.2](https://github.com/mu-lib/mu-jquery-app/compare/v9.0.1...v9.0.2) (2017-01-18)



<a name="9.0.1"></a>
## [9.0.1](https://github.com/mu-lib/mu-jquery-app/compare/v9.0.0...v9.0.1) (2017-01-18)


### Bug Fixes

* add dist output ([76bc0cd](https://github.com/mu-lib/mu-jquery-app/commit/76bc0cd))



<a name="9.0.0"></a>
# [9.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v8.0.2...v9.0.0) (2017-01-18)


### Features

* allow for more flexible initialization ([#2](https://github.com/mu-lib/mu-jquery-app/issues/2)) ([d2d5882](https://github.com/mu-lib/mu-jquery-app/commit/d2d5882))


### BREAKING CHANGES

* Previous to this the widgets took `hub` as a third constructor argument. With this change that should be wrapped in an object like so: `{ "hub": hub }`.



<a name="8.0.2"></a>
## [8.0.2](https://github.com/mu-lib/mu-jquery-app/compare/v8.0.1...v8.0.2) (2016-10-19)


### Bug Fixes

* **packaging:** bumped deps ([44c7527](https://github.com/mu-lib/mu-jquery-app/commit/44c7527))



<a name="8.0.1"></a>
## [8.0.1](https://github.com/mu-lib/mu-jquery-app/compare/v8.0.0...v8.0.1) (2016-10-19)


### Bug Fixes

* **examples:** added examples ([fee05c0](https://github.com/mu-lib/mu-jquery-app/commit/fee05c0))
* **examples:** better prototype example ([901b3b2](https://github.com/mu-lib/mu-jquery-app/commit/901b3b2))
* **examples:** clearer prototype example ([0dc5d24](https://github.com/mu-lib/mu-jquery-app/commit/0dc5d24))
* **examples:** made examples interactive with runkit ([18dff4a](https://github.com/mu-lib/mu-jquery-app/commit/18dff4a))
* **examples:** use mu-jquery-runkit plugin ([3ef7792](https://github.com/mu-lib/mu-jquery-app/commit/3ef7792))
* **packaging:** bumped deps ([8cbe8d2](https://github.com/mu-lib/mu-jquery-app/commit/8cbe8d2))
* **packaging:** ignore tests and exampes in bower ([1da55c9](https://github.com/mu-lib/mu-jquery-app/commit/1da55c9))
* **packaging:** jQuery versions ([e2eadaf](https://github.com/mu-lib/mu-jquery-app/commit/e2eadaf))



<a name="8.0.0"></a>
# [8.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v7.1.0...v8.0.0) (2016-10-16)


### Features

* **packaging:** bumped deps ([0445eba](https://github.com/mu-lib/mu-jquery-app/commit/0445eba))


### BREAKING CHANGES

* packaging: - mu-create@5.0.0
- mu-widget@9.0.0



<a name="7.1.0"></a>
# [7.1.0](https://github.com/mu-lib/mu-jquery-app/compare/v7.0.0...v7.1.0) (2016-10-16)


### Features

* **packaging:** bumped deps ([a09caa4](https://github.com/mu-lib/mu-jquery-app/commit/a09caa4))



<a name="7.0.0"></a>
# [7.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v6.4.0...v7.0.0) (2016-10-16)


### Features

* **packaging:** bumped deps ([f405c79](https://github.com/mu-lib/mu-jquery-app/commit/f405c79))


### BREAKING CHANGES

* packaging: - mu-jquery-widget@8.0.0



<a name="6.4.0"></a>
# [6.4.0](https://github.com/mu-lib/mu-jquery-app/compare/v6.3.0...v6.4.0) (2016-10-16)


### Features

* **packaging:** bumped deps ([7568410](https://github.com/mu-lib/mu-jquery-app/commit/7568410))



<a name="6.3.0"></a>
# [6.3.0](https://github.com/mu-lib/mu-jquery-app/compare/v6.2.0...v6.3.0) (2016-10-15)


### Features

* **deps:** bumped deps ([c49a1b5](https://github.com/mu-lib/mu-jquery-app/commit/c49a1b5))



<a name="6.2.0"></a>
# [6.2.0](https://github.com/mu-lib/mu-jquery-app/compare/v6.1.1...v6.2.0) (2016-10-13)


### Bug Fixes

* **examples:** UMD and reformat ([fb6c940](https://github.com/mu-lib/mu-jquery-app/commit/fb6c940))
* **tests:** UMD and reformat ([2849470](https://github.com/mu-lib/mu-jquery-app/commit/2849470))
* UMD and reformat ([55c843b](https://github.com/mu-lib/mu-jquery-app/commit/55c843b))


### Features

* **packaging:** updated package.json and bumped deps ([290b140](https://github.com/mu-lib/mu-jquery-app/commit/290b140))



<a name="6.1.1"></a>
## [6.1.1](https://github.com/mu-lib/mu-jquery-app/compare/v6.1.0...v6.1.1) (2016-09-26)


### Bug Fixes

* **packaging:** Array.prorotype.slice is hoisted ([b4ec01c](https://github.com/mu-lib/mu-jquery-app/commit/b4ec01c))
* **packaging:** fixed bower.json ([295a31d](https://github.com/mu-lib/mu-jquery-app/commit/295a31d))



<a name="6.1.0"></a>
# [6.1.0](https://github.com/mu-lib/mu-jquery-app/compare/v6.0.0...v6.1.0) (2016-09-26)


### Bug Fixes

* **umd:** slightly more performant umd wrapper ([2b0f0ce](https://github.com/mu-lib/mu-jquery-app/commit/2b0f0ce))


### Features

* **packaging:** bumped deps ([426fdf9](https://github.com/mu-lib/mu-jquery-app/commit/426fdf9))



<a name="6.0.0"></a>
# [6.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v5.0.1...v6.0.0) (2016-09-26)


* fix(widget) remove redundant return from subscribe/unsubscribe/publish ([574bc38](https://github.com/mu-lib/mu-jquery-app/commit/574bc38))


### Bug Fixes

* **deps:** bumped deps ([22754fb](https://github.com/mu-lib/mu-jquery-app/commit/22754fb))


### BREAKING CHANGES

* `widget[subscribe|unsubscribe|publish]` no longer have
any return defined.



<a name="5.0.1"></a>
## [5.0.1](https://github.com/mu-lib/mu-jquery-app/compare/v5.0.0...v5.0.1) (2016-09-25)


### Bug Fixes

* **packaging:** update package to include widget ([9076eda](https://github.com/mu-lib/mu-jquery-app/commit/9076eda))



<a name="5.0.0"></a>
# [5.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v4.4.0...v5.0.0) (2016-09-25)


### Bug Fixes

* **widget:** subscribe on initialize ([241bf20](https://github.com/mu-lib/mu-jquery-app/commit/241bf20))


### Features

* **widget:** added widget module ([a427ab8](https://github.com/mu-lib/mu-jquery-app/commit/a427ab8))
* **widget:** unsubscribe on finalize ([13850e4](https://github.com/mu-lib/mu-jquery-app/commit/13850e4))


### BREAKING CHANGES

* widget: Previous to this change widgets would subscribe to the
hub in the constructor and if the hub implemented callback-on-subscribe
those handlers would execute before the initialize event triggered on the
widget. This change fixes that as subscriptionsare now done during
`initialize`.
* widget: We've shuffled modules around to better mirror
`mu-jquery-widget` which breaks code that dirrectly depend on those.



<a name="4.4.0"></a>
# [4.4.0](https://github.com/mu-lib/mu-jquery-app/compare/v4.3.0...v4.4.0) (2016-09-23)


### Features

* **deps:** bumped deps ([2e56f10](https://github.com/mu-lib/mu-jquery-app/commit/2e56f10))


### BREAKING CHANGES

* deps: mu-jquery-component has been renamed to mu-jquery-loom,
update your code kids.



<a name="4.3.0"></a>
# [4.3.0](https://github.com/mu-lib/mu-jquery-app/compare/v4.2.0...v4.3.0) (2016-09-22)


### Features

* **deps:** bumped dependencies ([e1f32e9](https://github.com/mu-lib/mu-jquery-app/commit/e1f32e9))



<a name="4.2.0"></a>
# [4.2.0](https://github.com/mu-lib/mu-jquery-app/compare/v4.1.0...v4.2.0) (2016-09-22)


### Features

* **deps:** bumped dependencies ([324f6d7](https://github.com/mu-lib/mu-jquery-app/commit/324f6d7))



<a name="4.1.0"></a>
# [4.1.0](https://github.com/mu-lib/mu-jquery-app/compare/v4.0.1...v4.1.0) (2016-09-15)


### Features

* bumped mu-jquery-widget to 5.1.0 ([8b9ca90](https://github.com/mu-lib/mu-jquery-app/commit/8b9ca90))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/mu-lib/mu-jquery-app/compare/v4.0.0...v4.0.1) (2016-09-14)



<a name="4.0.0"></a>
# [4.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v3.0.0...v4.0.0) (2016-09-13)


### Features

* bump deps ([f0ed757](https://github.com/mu-lib/mu-jquery-app/commit/f0ed757))


### BREAKING CHANGES

* Dependencies renamed and relocated modules, all users
need to update their code.



<a name="3.0.0"></a>
# [3.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.10.0...v3.0.0) (2016-09-13)


### Features

* bumped deps ([119fffd](https://github.com/mu-lib/mu-jquery-app/commit/119fffd))


### BREAKING CHANGES

* Dependencies have relocated packages so update your apps.



<a name="2.10.0"></a>
# [2.10.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.9.0...v2.10.0) (2016-09-13)


### Features

* bump deps ([558b52a](https://github.com/mu-lib/mu-jquery-app/commit/558b52a))



<a name="2.9.0"></a>
# [2.9.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.8.0...v2.9.0) (2016-09-12)


### Features

* bumped mu-compose and mu-jquery-widget ([47ceb33](https://github.com/mu-lib/mu-jquery-app/commit/47ceb33))



<a name="2.8.0"></a>
# [2.8.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.7.0...v2.8.0) (2016-09-12)


### Features

* bumped deps ([d1d5af0](https://github.com/mu-lib/mu-jquery-app/commit/d1d5af0))



<a name="2.7.0"></a>
# [2.7.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.6.1...v2.7.0) (2016-09-12)


### Features

* Qunit ([#1](https://github.com/mu-lib/mu-jquery-app/issues/1)) ([b9370cb](https://github.com/mu-lib/mu-jquery-app/commit/b9370cb))



<a name="2.6.1"></a>
## [2.6.1](https://github.com/mu-lib/mu-jquery-app/compare/v2.6.0...v2.6.1) (2016-09-08)


### Bug Fixes

* UMD fixes and library bumps ([d63b4a2](https://github.com/mu-lib/mu-jquery-app/commit/d63b4a2))



<a name="2.6.0"></a>
# [2.6.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.5.1...v2.6.0) (2016-09-06)


### Features

* bump mu-jquery-hub to 1.1.0 ([18a54cd](https://github.com/mu-lib/mu-jquery-app/commit/18a54cd))



<a name="2.5.1"></a>
## [2.5.1](https://github.com/mu-lib/mu-jquery-app/compare/v2.5.0...v2.5.1) (2016-09-06)


### Bug Fixes

* bumped mu-jquery-widget and mu-jquery-crank ([b3e25bc](https://github.com/mu-lib/mu-jquery-app/commit/b3e25bc))



<a name="2.5.0"></a>
# [2.5.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.4.0...v2.5.0) (2016-09-06)


### Features

* bump mu-jquery-widget and mu-jquery-crank to latest version ([fcfaed4](https://github.com/mu-lib/mu-jquery-app/commit/fcfaed4))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.3.0...v2.4.0) (2016-09-06)


### Features

* bump mu-jquery-widget to 2.3.0 ([c8e5104](https://github.com/mu-lib/mu-jquery-app/commit/c8e5104))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.2.0...v2.3.0) (2016-09-03)


### Features

* bump mu-compose to v2.0.0 ([fc81602](https://github.com/mu-lib/mu-jquery-app/commit/fc81602))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.1.0...v2.2.0) (2016-09-03)


### Bug Fixes

* be safe and slice arguments ([8e9fdb2](https://github.com/mu-lib/mu-jquery-app/commit/8e9fdb2))
* distfile fix ([6839691](https://github.com/mu-lib/mu-jquery-app/commit/6839691))


### Features

* added dist outupt ([c00201d](https://github.com/mu-lib/mu-jquery-app/commit/c00201d))
* added gulp support ([c883a4c](https://github.com/mu-lib/mu-jquery-app/commit/c883a4c))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/mu-lib/mu-jquery-app/compare/v2.0.0...v2.1.0) (2016-09-03)


### Bug Fixes

* UMD fixes ([180c0a4](https://github.com/mu-lib/mu-jquery-app/commit/180c0a4))


### Features

* bumped deps ([e687408](https://github.com/mu-lib/mu-jquery-app/commit/e687408))
* use mu-jquery-app/jquery.weave ([9440235](https://github.com/mu-lib/mu-jquery-app/commit/9440235))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v1.0.0...v2.0.0) (2016-09-02)


### Features

* use jquery.weave from mu-jquery-widget ([c60a7b5](https://github.com/mu-lib/mu-jquery-app/commit/c60a7b5))


### BREAKING CHANGES

* We've moved jquery.weave to mu-jquery-widget



<a name="1.0.0"></a>
# [1.0.0](https://github.com/mu-lib/mu-jquery-app/compare/v0.1.0...v1.0.0) (2016-09-02)


### Features

* support for additional arguments in jquery.weave ([1679743](https://github.com/mu-lib/mu-jquery-app/commit/1679743))


### BREAKING CHANGES

* jquery.weave no longer issues a crank after weaving.



<a name="0.1.0"></a>
# [0.1.0](https://github.com/mu-lib/mu-jquery-app/compare/v0.0.1...v0.1.0) (2016-09-02)


### Features

* externalize weave ([2492bef](https://github.com/mu-lib/mu-jquery-app/commit/2492bef))



<a name="0.0.1"></a>
## 0.0.1 (2016-09-02)


### Bug Fixes

* module typo ([a990589](https://github.com/mu-lib/mu-jquery-app/commit/a990589))
* wire 2.0.0 expects instance not module ([1395ba7](https://github.com/mu-lib/mu-jquery-app/commit/1395ba7))


### Features

* add hub functionality ([9236763](https://github.com/mu-lib/mu-jquery-app/commit/9236763))
* added bower support ([ea59c85](https://github.com/mu-lib/mu-jquery-app/commit/ea59c85))
* added package.json ([0e7f528](https://github.com/mu-lib/mu-jquery-app/commit/0e7f528))
* added simple lifecycle management ([6dd1959](https://github.com/mu-lib/mu-jquery-app/commit/6dd1959))
* composer integrated support for a hub ([cde8665](https://github.com/mu-lib/mu-jquery-app/commit/cde8665))
* deferred start ([11d843e](https://github.com/mu-lib/mu-jquery-app/commit/11d843e))
* **hub:** add default 'memory' and 'stopOnFalse' flags to hub ([98cadad](https://github.com/mu-lib/mu-jquery-app/commit/98cadad))
* hub is now a factory that takes $.Callbacks flags ([1c439b9](https://github.com/mu-lib/mu-jquery-app/commit/1c439b9))
* simplified crank usage ([3a62729](https://github.com/mu-lib/mu-jquery-app/commit/3a62729))
* support multi instance ([2a8422d](https://github.com/mu-lib/mu-jquery-app/commit/2a8422d))
* upgrade wire to 2.0.0 ([097b5a3](https://github.com/mu-lib/mu-jquery-app/commit/097b5a3))
* use nev versions of mu-jquery-hub and mu-jquery-widget ([621bce8](https://github.com/mu-lib/mu-jquery-app/commit/621bce8))
* use new external $.fn.widget and new regexp composer ([8654ada](https://github.com/mu-lib/mu-jquery-app/commit/8654ada))
* use new wire and crank ([a0d02c3](https://github.com/mu-lib/mu-jquery-app/commit/a0d02c3))
* use UMD style bootstrap script ([5bc4e53](https://github.com/mu-lib/mu-jquery-app/commit/5bc4e53))
