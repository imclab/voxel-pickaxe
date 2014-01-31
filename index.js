// Generated by CoffeeScript 1.7.0
(function() {
  var AmorphousRecipe, CraftingThesaurus, ItemPile, PositionalRecipe, Recipe, RecipeLocator, RepairRecipe, ToolsPlugin, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ItemPile = require('itempile');

  _ref = require('craftingrecipes'), Recipe = _ref.Recipe, AmorphousRecipe = _ref.AmorphousRecipe, PositionalRecipe = _ref.PositionalRecipe, CraftingThesaurus = _ref.CraftingThesaurus, RecipeLocator = _ref.RecipeLocator;

  module.exports = function(game, opts) {
    return new ToolsPlugin(game, opts);
  };

  module.exports.pluginInfo = {
    loadAfter: ['voxel-recipes', 'voxel-registry']
  };

  ToolsPlugin = (function() {
    function ToolsPlugin(game, opts) {
      var _ref1;
      this.game = game;
      this.registry = (function() {
        var _ref2;
        if ((_ref1 = (_ref2 = game.plugins) != null ? _ref2.get('voxel-registry') : void 0) != null) {
          return _ref1;
        } else {
          throw 'voxel-pickaxe requires "voxel-registry" plugin';
        }
      })();
      this.enable();
    }

    ToolsPlugin.prototype.enable = function() {
      var recipes, _ref1;
      this.registry.registerBlock('plankOak', {
        displayName: 'Oak Planks',
        texture: 'planks_oak'
      });
      this.registry.registerItem('stick', {
        itemTexture: 'items/stick'
      });
      this.registry.registerItem('pickaxeWood', {
        displayName: 'Wooden Pickaxe',
        itemTexture: 'items/wood_pickaxe',
        speed: 2.0,
        maxDamage: 10
      });
      this.registry.registerItem('pickaxeStone', {
        displayName: 'Stone Pickaxe',
        itemTexture: 'items/stone_pickaxe',
        speed: 10.0,
        maxDamage: 100
      });
      this.registry.registerItem('shovelWood', {
        displayName: 'Wooden Shovel',
        itemTexture: 'items/wood_shovel',
        speed: 2.0,
        maxDamage: 5
      });
      this.registry.registerItem('shovelStone', {
        displayName: 'Stone Shovel',
        itemTexture: 'items/stone_shovel',
        speed: 3.0,
        maxDamage: 50
      });
      recipes = (_ref1 = this.game.plugins) != null ? _ref1.get('voxel-recipes') : void 0;
      if (recipes != null) {
        recipes.thesaurus.registerName('wood.plank', 'plankOak');
        recipes.register(new AmorphousRecipe(['wood.log'], new ItemPile('plankOak', 2)));
        recipes.register(new AmorphousRecipe(['wood.plank', 'wood.plank'], new ItemPile('stick', 4)));
        recipes.register(new PositionalRecipe([['wood.plank', 'wood.plank', 'wood.plank'], [void 0, 'stick', void 0], [void 0, 'stick', void 0]], new ItemPile('pickaxeWood', 1, {
          damage: 0
        })));
        recipes.register(new PositionalRecipe([['cobblestone', 'cobblestone', 'cobblestone'], [void 0, 'stick', void 0], [void 0, 'stick', void 0]], new ItemPile('pickaxeStone', 1, {
          damage: 0
        })));
        recipes.register(new RepairRecipe('pickaxeWood', 'plankOak', 4));
        return recipes.register(new RepairRecipe('pickaxeStone', 'cobblestone', 20));
      }
    };

    ToolsPlugin.prototype.disable = function() {};

    return ToolsPlugin;

  })();

  RepairRecipe = (function(_super) {
    __extends(RepairRecipe, _super);

    function RepairRecipe(toolItem, repairingItem, repairAmount) {
      this.toolItem = toolItem;
      this.repairingItem = repairingItem;
      this.repairAmount = repairAmount;
    }

    RepairRecipe.prototype.findMatchingSlots = function(inventory) {
      var foundIndices, _ref1, _ref2;
      foundIndices = {};
      if (((_ref1 = inventory.get(0)) != null ? _ref1.item : void 0) === this.toolItem) {
        foundIndices.tool = 0;
      } else {
        return void 0;
      }
      if (((_ref2 = inventory.get(1)) != null ? _ref2.item : void 0) === this.repairingItem) {
        foundIndices.repairing = 1;
      } else {
        return void 0;
      }
      return foundIndices;
    };

    RepairRecipe.prototype.computeOutput = function(inventory) {
      var newDamage, oldDamage, repairedTool, slots, tool, _ref1;
      slots = this.findMatchingSlots(inventory);
      if (slots == null) {
        return void 0;
      }
      tool = inventory.get(slots.tool);
      repairedTool = tool.clone();
      oldDamage = (_ref1 = repairedTool.tags.damage) != null ? _ref1 : 0;
      newDamage = oldDamage - this.repairAmount;
      if (newDamage < 0) {
        newDamage = 0;
      }
      repairedTool.tags.damage = newDamage;
      return repairedTool;
    };

    RepairRecipe.prototype.craft = function(inventory) {
      var slots;
      slots = this.findMatchingSlots(inventory);
      if (slots == null) {
        return void 0;
      }
      inventory.takeAt(slots.tool, 1);
      inventory.takeAt(slots.repairing, 1);
      return this.computeOutput(inventory);
    };

    return RepairRecipe;

  })(Recipe);

}).call(this);
