import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import IntlMessageFormat, { Formats } from 'intl-messageformat';
import { IntlResources, Localize } from '../../interfaces/intl';
import * as Language from '../../singleton/language';
import { boundMethod } from 'autobind-decorator';

@Component({
  tag: 'eip-intl',
  shadow: true,
  styleUrl: 'eip-intl.css'
})
export class EipIntlElement {

  @Prop()
  resources: IntlResources;

  @Prop()
  formats: Partial<Formats>;

  @Prop()
  useKeyIfMissing: boolean;

  @Event()
  localize: EventEmitter<Localize>;

  private checkLocalizationCache(proto) {
    // do nothing if proto is undefined.
    if (proto === undefined)
      return;

    // In the event proto not have __localizationCache object, create it.
    if (proto['__localizationCache'] === undefined) {
      proto['__localizationCache'] = {requests: {}, messages: {}, ajax: null};
    }
  }

  @boundMethod
  dispatchLocalize(language: string) {
    var proto = this.constructor.prototype;
    const resources = this.resources;
    const formats = this.formats;

    // Check if localCache exist just in case.
    this.checkLocalizationCache(proto);

    // Everytime any of the parameters change, invalidate the strings cache.
    if (!proto.__localizationCache) {
      proto['__localizationCache'] = {requests: {}, messages: {}, ajax: null};
    }
    proto.__localizationCache.messages = {};

    const localize = (...fnArgs) => {
      var key = fnArgs[0];
      if (!key || !resources || !language || !resources[language])
        return;

      // Cache the key/value pairs for the same language, so that we don't
      // do extra work if we're just reusing strings across an application.
      var translatedValue = resources[language][key];

      if (!translatedValue) {
        return this.useKeyIfMissing ? key : '';
      }

      var messageKey = key + translatedValue;
      var translatedMessage = proto.__localizationCache.messages[messageKey];

      if (!translatedMessage) {
        translatedMessage =
            new IntlMessageFormat(translatedValue, language, formats);
        proto.__localizationCache.messages[messageKey] = translatedMessage;
      }

      var args = {};
      for (var i = 1; i < arguments.length; i += 2) {
        args[arguments[i]] = arguments[i + 1];
      }

      return translatedMessage.format(args);
    };

    this.localize.emit(localize);
  }

  connectedCallback() {
    const language = Language.getLanguage();
    Language.addListener('language-changed', this.dispatchLocalize);
    this.dispatchLocalize(language);
  }

  disconnectedCallback() {
    Language.removeListener('language-changed', this.dispatchLocalize);
  }
}
