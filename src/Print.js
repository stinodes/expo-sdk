// @flow

import { NativeModules, Platform } from 'react-native';

const { ExponentPrint } = NativeModules;

type PrintOptions = {
  filePath: string,
  html?: string,
  printerUrl?: string,
};

type SelectResult = {
  name: string,
  url: string,
};

export async function printAsync(options: PrintOptions): Promise<> {
  if ((!!options.uri && !!options.html) || (!options.uri && !options.html)) {
    throw new Error("Must provide either `html` or `uri`. Both are either missing or passed together.");
  }
  return ExponentPrint.print(options);
}

export async function selectPrinterAsync(): Promise<SelectResult> {
  if (Platform.OS === 'ios') {
    return ExponentPrint.selectPrinter();
  } else {
    throw new Error('Selecting the printer in advance is not available on Android.');
  }
}
