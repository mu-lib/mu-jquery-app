# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
