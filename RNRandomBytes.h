//
//  RNRandomBytes.h
//  randombytes
//
//  Created by Mark Vayngrib on 10/13/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#if __has_include(<React/RCTBridgeModule.h>)
  #import <React/RCTBridgeModule.h>
#else
  #import "RCTBridgeModule.h"
#endif
#import <React/RCTBridge.h>

@interface RNRandomBytes : NSObject<RCTBridgeModule>

@end
