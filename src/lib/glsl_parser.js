(function (console, $hx_exports, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		var tmp;
		if(this.r.m != null && n >= 0 && n < this.r.m.length) tmp = this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
		return tmp;
	}
	,matchedRight: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,__class__: EReg
};
var GLSLParser = $hx_exports.GLSLParser = function() {
	this.warnings = [];
};
GLSLParser.__name__ = true;
GLSLParser.main = function() {
};
GLSLParser.prototype = {
	parse: function(input) {
		var tokens = glsl_lex_Tokenizer.tokenize(input);
		this.warnings = this.warnings.concat(glsl_lex_Tokenizer.warnings);
		tokens = glsl_preprocess_Preprocessor.process(tokens);
		this.warnings = this.warnings.concat(glsl_preprocess_Preprocessor.warnings);
		var ast = glsl_parse_Parser.parseTokens(tokens);
		this.warnings = this.warnings.concat(glsl_parse_Parser.warnings);
		return ast;
	}
	,printAST: function(ast) {
		return glsl_print_NodePrinter.print(ast,"\t");
	}
	,__class__: GLSLParser
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = true;
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		return false;
	}
	return true;
};
var glsl_Node = function() { };
glsl_Node.__name__ = true;
glsl_Node.prototype = {
	__class__: glsl_Node
};
var glsl_Root = function(declarations) {
	this.declarations = declarations;
	this.nodeName = "Root";
	this.nodeType = glsl_NodeType.RootNode(this);
};
glsl_Root.__name__ = true;
glsl_Root.__interfaces__ = [glsl_Node];
glsl_Root.prototype = {
	__class__: glsl_Root
};
var glsl_TypeSpecifier = function(dataType,storage,precision,invariant) {
	if(invariant == null) invariant = false;
	this.dataType = dataType;
	this.storage = storage;
	this.precision = precision;
	this.invariant = invariant;
	this.nodeName = "TypeSpecifier";
	this.nodeType = glsl_NodeType.TypeSpecifierNode(this);
};
glsl_TypeSpecifier.__name__ = true;
glsl_TypeSpecifier.__interfaces__ = [glsl_Node];
glsl_TypeSpecifier.prototype = {
	__class__: glsl_TypeSpecifier
};
var glsl_StructSpecifier = function(name,fieldDeclarations) {
	this.name = name;
	this.fieldDeclarations = fieldDeclarations;
	glsl_TypeSpecifier.call(this,glsl_DataType.USER_TYPE(name));
	this.nodeName = "StructSpecifier";
	this.nodeType = glsl_NodeType.StructSpecifierNode(this);
};
glsl_StructSpecifier.__name__ = true;
glsl_StructSpecifier.__super__ = glsl_TypeSpecifier;
glsl_StructSpecifier.prototype = $extend(glsl_TypeSpecifier.prototype,{
	__class__: glsl_StructSpecifier
});
var glsl_StructFieldDeclaration = function(typeSpecifier,declarators) {
	this.typeSpecifier = typeSpecifier;
	this.declarators = declarators;
	this.nodeName = "StructFieldDeclaration";
	this.nodeType = glsl_NodeType.StructFieldDeclarationNode(this);
};
glsl_StructFieldDeclaration.__name__ = true;
glsl_StructFieldDeclaration.__interfaces__ = [glsl_Node];
glsl_StructFieldDeclaration.prototype = {
	__class__: glsl_StructFieldDeclaration
};
var glsl_StructDeclarator = function(name,arraySizeExpression) {
	this.name = name;
	this.arraySizeExpression = arraySizeExpression;
	this.nodeName = "StructDeclarator";
	this.nodeType = glsl_NodeType.StructDeclaratorNode(this);
};
glsl_StructDeclarator.__name__ = true;
glsl_StructDeclarator.__interfaces__ = [glsl_Node];
glsl_StructDeclarator.prototype = {
	__class__: glsl_StructDeclarator
};
var glsl_Expression = function() { };
glsl_Expression.__name__ = true;
glsl_Expression.__interfaces__ = [glsl_Node];
glsl_Expression.prototype = {
	__class__: glsl_Expression
};
var glsl_TypedExpression = function() { };
glsl_TypedExpression.__name__ = true;
glsl_TypedExpression.prototype = {
	__class__: glsl_TypedExpression
};
var glsl_Identifier = function(name) {
	this.enclosed = false;
	this.name = name;
	this.nodeName = "Identifier";
	this.nodeType = glsl_NodeType.IdentifierNode(this);
};
glsl_Identifier.__name__ = true;
glsl_Identifier.__interfaces__ = [glsl_Expression];
glsl_Identifier.prototype = {
	__class__: glsl_Identifier
};
var glsl_Primitive = function(value,dataType) {
	this.enclosed = false;
	this.dataType = dataType;
	this.set_value(value);
	this.nodeName = "Primitive";
	this.nodeType = glsl_NodeType.PrimitiveNode(this);
};
glsl_Primitive.__name__ = true;
glsl_Primitive.__interfaces__ = [glsl_TypedExpression,glsl_Expression];
glsl_Primitive.prototype = {
	set_value: function(v) {
		var _g = this.dataType;
		switch(_g[1]) {
		case 2:
			this.raw = glsl_print_Utils.intString(v);
			break;
		case 1:
			this.raw = glsl_print_Utils.floatString(v);
			break;
		case 3:
			this.raw = glsl_print_Utils.boolString(v);
			break;
		default:
			this.raw = "";
		}
		return this.value = v;
	}
	,__class__: glsl_Primitive
};
var glsl_BinaryExpression = function(op,left,right) {
	this.enclosed = false;
	this.op = op;
	this.left = left;
	this.right = right;
	this.nodeName = "BinaryExpression";
	this.nodeType = glsl_NodeType.BinaryExpressionNode(this);
};
glsl_BinaryExpression.__name__ = true;
glsl_BinaryExpression.__interfaces__ = [glsl_Expression];
glsl_BinaryExpression.prototype = {
	__class__: glsl_BinaryExpression
};
var glsl_UnaryExpression = function(op,arg,isPrefix) {
	this.enclosed = false;
	this.op = op;
	this.arg = arg;
	this.isPrefix = isPrefix;
	this.nodeName = "UnaryExpression";
	this.nodeType = glsl_NodeType.UnaryExpressionNode(this);
};
glsl_UnaryExpression.__name__ = true;
glsl_UnaryExpression.__interfaces__ = [glsl_Expression];
glsl_UnaryExpression.prototype = {
	__class__: glsl_UnaryExpression
};
var glsl_SequenceExpression = function(expressions) {
	this.enclosed = false;
	this.expressions = expressions;
	this.nodeName = "SequenceExpression";
	this.nodeType = glsl_NodeType.SequenceExpressionNode(this);
};
glsl_SequenceExpression.__name__ = true;
glsl_SequenceExpression.__interfaces__ = [glsl_Expression];
glsl_SequenceExpression.prototype = {
	__class__: glsl_SequenceExpression
};
var glsl_ConditionalExpression = function(test,consequent,alternate) {
	this.enclosed = false;
	this.test = test;
	this.consequent = consequent;
	this.alternate = alternate;
	this.nodeName = "ConditionalExpression";
	this.nodeType = glsl_NodeType.ConditionalExpressionNode(this);
};
glsl_ConditionalExpression.__name__ = true;
glsl_ConditionalExpression.__interfaces__ = [glsl_Expression];
glsl_ConditionalExpression.prototype = {
	__class__: glsl_ConditionalExpression
};
var glsl_AssignmentExpression = function(op,left,right) {
	this.enclosed = false;
	this.op = op;
	this.left = left;
	this.right = right;
	this.nodeName = "AssignmentExpression";
	this.nodeType = glsl_NodeType.AssignmentExpressionNode(this);
};
glsl_AssignmentExpression.__name__ = true;
glsl_AssignmentExpression.__interfaces__ = [glsl_Expression];
glsl_AssignmentExpression.prototype = {
	__class__: glsl_AssignmentExpression
};
var glsl_FieldSelectionExpression = function(left,field) {
	this.enclosed = false;
	this.left = left;
	this.field = field;
	this.nodeName = "FieldSelectionExpression";
	this.nodeType = glsl_NodeType.FieldSelectionExpressionNode(this);
};
glsl_FieldSelectionExpression.__name__ = true;
glsl_FieldSelectionExpression.__interfaces__ = [glsl_Expression];
glsl_FieldSelectionExpression.prototype = {
	__class__: glsl_FieldSelectionExpression
};
var glsl_ArrayElementSelectionExpression = function(left,arrayIndexExpression) {
	this.enclosed = false;
	this.left = left;
	this.arrayIndexExpression = arrayIndexExpression;
	this.nodeName = "ArrayElementSelectionExpression";
	this.nodeType = glsl_NodeType.ArrayElementSelectionExpressionNode(this);
};
glsl_ArrayElementSelectionExpression.__name__ = true;
glsl_ArrayElementSelectionExpression.__interfaces__ = [glsl_Expression];
glsl_ArrayElementSelectionExpression.prototype = {
	__class__: glsl_ArrayElementSelectionExpression
};
var glsl_ExpressionParameters = function() { };
glsl_ExpressionParameters.__name__ = true;
glsl_ExpressionParameters.prototype = {
	__class__: glsl_ExpressionParameters
};
var glsl_FunctionCall = function(name,parameters) {
	this.enclosed = false;
	this.name = name;
	this.parameters = parameters != null?parameters:[];
	this.nodeName = "FunctionCall";
	this.nodeType = glsl_NodeType.FunctionCallNode(this);
};
glsl_FunctionCall.__name__ = true;
glsl_FunctionCall.__interfaces__ = [glsl_ExpressionParameters,glsl_Expression];
glsl_FunctionCall.prototype = {
	__class__: glsl_FunctionCall
};
var glsl_Constructor = function(dataType,parameters) {
	this.enclosed = false;
	this.dataType = dataType;
	this.parameters = parameters != null?parameters:[];
	this.nodeName = "Constructor";
	this.nodeType = glsl_NodeType.ConstructorNode(this);
};
glsl_Constructor.__name__ = true;
glsl_Constructor.__interfaces__ = [glsl_TypedExpression,glsl_ExpressionParameters,glsl_Expression];
glsl_Constructor.prototype = {
	__class__: glsl_Constructor
};
var glsl_Declaration = function() { };
glsl_Declaration.__name__ = true;
glsl_Declaration.__interfaces__ = [glsl_Node];
glsl_Declaration.prototype = {
	__class__: glsl_Declaration
};
var glsl_PrecisionDeclaration = function(precision,dataType) {
	this.external = false;
	this.precision = precision;
	this.dataType = dataType;
	this.nodeName = "PrecisionDeclaration";
	this.nodeType = glsl_NodeType.PrecisionDeclarationNode(this);
};
glsl_PrecisionDeclaration.__name__ = true;
glsl_PrecisionDeclaration.__interfaces__ = [glsl_Declaration];
glsl_PrecisionDeclaration.prototype = {
	__class__: glsl_PrecisionDeclaration
};
var glsl_FunctionPrototype = function(header) {
	this.external = false;
	this.header = header;
	this.nodeName = "FunctionPrototype";
	this.nodeType = glsl_NodeType.FunctionPrototypeNode(this);
};
glsl_FunctionPrototype.__name__ = true;
glsl_FunctionPrototype.__interfaces__ = [glsl_Declaration];
glsl_FunctionPrototype.prototype = {
	__class__: glsl_FunctionPrototype
};
var glsl_VariableDeclaration = function(typeSpecifier,declarators) {
	this.external = false;
	this.typeSpecifier = typeSpecifier;
	this.declarators = declarators;
	this.nodeName = "VariableDeclaration";
	this.nodeType = glsl_NodeType.VariableDeclarationNode(this);
};
glsl_VariableDeclaration.__name__ = true;
glsl_VariableDeclaration.__interfaces__ = [glsl_Declaration];
glsl_VariableDeclaration.prototype = {
	__class__: glsl_VariableDeclaration
};
var glsl_Declarator = function(name,initializer,arraySizeExpression) {
	this.name = name;
	this.initializer = initializer;
	this.arraySizeExpression = arraySizeExpression;
	this.nodeName = "Declarator";
	this.nodeType = glsl_NodeType.DeclaratorNode(this);
};
glsl_Declarator.__name__ = true;
glsl_Declarator.__interfaces__ = [glsl_Node];
glsl_Declarator.prototype = {
	__class__: glsl_Declarator
};
var glsl_ParameterDeclaration = function(name,typeSpecifier,parameterQualifier,arraySizeExpression) {
	glsl_Declarator.call(this,name,null,arraySizeExpression);
	this.typeSpecifier = typeSpecifier;
	this.parameterQualifier = parameterQualifier;
	this.nodeName = "ParameterDeclaration";
	this.nodeType = glsl_NodeType.ParameterDeclarationNode(this);
};
glsl_ParameterDeclaration.__name__ = true;
glsl_ParameterDeclaration.__super__ = glsl_Declarator;
glsl_ParameterDeclaration.prototype = $extend(glsl_Declarator.prototype,{
	__class__: glsl_ParameterDeclaration
});
var glsl_FunctionDefinition = function(header,body) {
	this.external = true;
	this.header = header;
	this.body = body;
	this.nodeName = "FunctionDefinition";
	this.nodeType = glsl_NodeType.FunctionDefinitionNode(this);
};
glsl_FunctionDefinition.__name__ = true;
glsl_FunctionDefinition.__interfaces__ = [glsl_Declaration];
glsl_FunctionDefinition.prototype = {
	__class__: glsl_FunctionDefinition
};
var glsl_FunctionHeader = function(name,returnType,parameters) {
	this.name = name;
	this.returnType = returnType;
	this.parameters = parameters != null?parameters:[];
	this.nodeName = "FunctionHeader";
	this.nodeType = glsl_NodeType.FunctionHeaderNode(this);
};
glsl_FunctionHeader.__name__ = true;
glsl_FunctionHeader.__interfaces__ = [glsl_Node];
glsl_FunctionHeader.prototype = {
	__class__: glsl_FunctionHeader
};
var glsl_Statement = function() { };
glsl_Statement.__name__ = true;
glsl_Statement.__interfaces__ = [glsl_Node];
var glsl_CompoundStatement = function(statementList) {
	this.statementList = statementList;
	this.nodeName = "CompoundStatement";
	this.nodeType = glsl_NodeType.CompoundStatementNode(this);
};
glsl_CompoundStatement.__name__ = true;
glsl_CompoundStatement.__interfaces__ = [glsl_Statement];
glsl_CompoundStatement.prototype = {
	__class__: glsl_CompoundStatement
};
var glsl_DeclarationStatement = function(declaration) {
	this.declaration = declaration;
	this.nodeName = "DeclarationStatement";
	this.nodeType = glsl_NodeType.DeclarationStatementNode(this);
};
glsl_DeclarationStatement.__name__ = true;
glsl_DeclarationStatement.__interfaces__ = [glsl_Statement];
glsl_DeclarationStatement.prototype = {
	__class__: glsl_DeclarationStatement
};
var glsl_ExpressionStatement = function(expression) {
	this.expression = expression;
	this.nodeName = "ExpressionStatement";
	this.nodeType = glsl_NodeType.ExpressionStatementNode(this);
};
glsl_ExpressionStatement.__name__ = true;
glsl_ExpressionStatement.__interfaces__ = [glsl_Statement];
glsl_ExpressionStatement.prototype = {
	__class__: glsl_ExpressionStatement
};
var glsl_IfStatement = function(test,consequent,alternate) {
	this.test = test;
	this.consequent = consequent;
	this.alternate = alternate;
	this.nodeName = "IfStatement";
	this.nodeType = glsl_NodeType.IfStatementNode(this);
};
glsl_IfStatement.__name__ = true;
glsl_IfStatement.__interfaces__ = [glsl_Statement];
glsl_IfStatement.prototype = {
	__class__: glsl_IfStatement
};
var glsl_JumpStatement = function(mode) {
	this.mode = mode;
	this.nodeName = "JumpStatement";
	this.nodeType = glsl_NodeType.JumpStatementNode(this);
};
glsl_JumpStatement.__name__ = true;
glsl_JumpStatement.__interfaces__ = [glsl_Statement];
glsl_JumpStatement.prototype = {
	__class__: glsl_JumpStatement
};
var glsl_ReturnStatement = function(returnExpression) {
	this.returnExpression = returnExpression;
	glsl_JumpStatement.call(this,glsl_JumpMode.RETURN);
	this.nodeName = "ReturnStatement";
	this.nodeType = glsl_NodeType.ReturnStatementNode(this);
};
glsl_ReturnStatement.__name__ = true;
glsl_ReturnStatement.__super__ = glsl_JumpStatement;
glsl_ReturnStatement.prototype = $extend(glsl_JumpStatement.prototype,{
	__class__: glsl_ReturnStatement
});
var glsl_IterationStatement = function() { };
glsl_IterationStatement.__name__ = true;
glsl_IterationStatement.__interfaces__ = [glsl_Statement];
glsl_IterationStatement.prototype = {
	__class__: glsl_IterationStatement
};
var glsl_WhileStatement = function(test,body) {
	this.test = test;
	this.body = body;
	this.nodeName = "WhileStatement";
	this.nodeType = glsl_NodeType.WhileStatementNode(this);
};
glsl_WhileStatement.__name__ = true;
glsl_WhileStatement.__interfaces__ = [glsl_IterationStatement];
glsl_WhileStatement.prototype = {
	__class__: glsl_WhileStatement
};
var glsl_DoWhileStatement = function(test,body) {
	this.test = test;
	this.body = body;
	this.nodeName = "DoWhileStatement";
	this.nodeType = glsl_NodeType.DoWhileStatementNode(this);
};
glsl_DoWhileStatement.__name__ = true;
glsl_DoWhileStatement.__interfaces__ = [glsl_IterationStatement];
glsl_DoWhileStatement.prototype = {
	__class__: glsl_DoWhileStatement
};
var glsl_ForStatement = function(init,test,update,body) {
	this.init = init;
	this.test = test;
	this.update = update;
	this.body = body;
	this.nodeName = "ForStatement";
	this.nodeType = glsl_NodeType.ForStatementNode(this);
};
glsl_ForStatement.__name__ = true;
glsl_ForStatement.__interfaces__ = [glsl_IterationStatement];
glsl_ForStatement.prototype = {
	__class__: glsl_ForStatement
};
var glsl_PreprocessorDirective = function(content) {
	this.external = true;
	this.content = content;
	this.nodeName = "PreprocessorDirective";
	this.nodeType = glsl_NodeType.PreprocessorDirectiveNode(this);
};
glsl_PreprocessorDirective.__name__ = true;
glsl_PreprocessorDirective.__interfaces__ = [glsl_Statement,glsl_Declaration];
glsl_PreprocessorDirective.prototype = {
	__class__: glsl_PreprocessorDirective
};
var glsl_BinaryOperator = { __ename__ : true, __constructs__ : ["STAR","SLASH","PERCENT","PLUS","DASH","LEFT_OP","RIGHT_OP","LEFT_ANGLE","RIGHT_ANGLE","LE_OP","GE_OP","EQ_OP","NE_OP","AMPERSAND","CARET","VERTICAL_BAR","AND_OP","XOR_OP","OR_OP"] };
glsl_BinaryOperator.STAR = ["STAR",0];
glsl_BinaryOperator.STAR.toString = $estr;
glsl_BinaryOperator.STAR.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.SLASH = ["SLASH",1];
glsl_BinaryOperator.SLASH.toString = $estr;
glsl_BinaryOperator.SLASH.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.PERCENT = ["PERCENT",2];
glsl_BinaryOperator.PERCENT.toString = $estr;
glsl_BinaryOperator.PERCENT.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.PLUS = ["PLUS",3];
glsl_BinaryOperator.PLUS.toString = $estr;
glsl_BinaryOperator.PLUS.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.DASH = ["DASH",4];
glsl_BinaryOperator.DASH.toString = $estr;
glsl_BinaryOperator.DASH.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.LEFT_OP = ["LEFT_OP",5];
glsl_BinaryOperator.LEFT_OP.toString = $estr;
glsl_BinaryOperator.LEFT_OP.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.RIGHT_OP = ["RIGHT_OP",6];
glsl_BinaryOperator.RIGHT_OP.toString = $estr;
glsl_BinaryOperator.RIGHT_OP.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.LEFT_ANGLE = ["LEFT_ANGLE",7];
glsl_BinaryOperator.LEFT_ANGLE.toString = $estr;
glsl_BinaryOperator.LEFT_ANGLE.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.RIGHT_ANGLE = ["RIGHT_ANGLE",8];
glsl_BinaryOperator.RIGHT_ANGLE.toString = $estr;
glsl_BinaryOperator.RIGHT_ANGLE.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.LE_OP = ["LE_OP",9];
glsl_BinaryOperator.LE_OP.toString = $estr;
glsl_BinaryOperator.LE_OP.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.GE_OP = ["GE_OP",10];
glsl_BinaryOperator.GE_OP.toString = $estr;
glsl_BinaryOperator.GE_OP.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.EQ_OP = ["EQ_OP",11];
glsl_BinaryOperator.EQ_OP.toString = $estr;
glsl_BinaryOperator.EQ_OP.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.NE_OP = ["NE_OP",12];
glsl_BinaryOperator.NE_OP.toString = $estr;
glsl_BinaryOperator.NE_OP.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.AMPERSAND = ["AMPERSAND",13];
glsl_BinaryOperator.AMPERSAND.toString = $estr;
glsl_BinaryOperator.AMPERSAND.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.CARET = ["CARET",14];
glsl_BinaryOperator.CARET.toString = $estr;
glsl_BinaryOperator.CARET.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.VERTICAL_BAR = ["VERTICAL_BAR",15];
glsl_BinaryOperator.VERTICAL_BAR.toString = $estr;
glsl_BinaryOperator.VERTICAL_BAR.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.AND_OP = ["AND_OP",16];
glsl_BinaryOperator.AND_OP.toString = $estr;
glsl_BinaryOperator.AND_OP.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.XOR_OP = ["XOR_OP",17];
glsl_BinaryOperator.XOR_OP.toString = $estr;
glsl_BinaryOperator.XOR_OP.__enum__ = glsl_BinaryOperator;
glsl_BinaryOperator.OR_OP = ["OR_OP",18];
glsl_BinaryOperator.OR_OP.toString = $estr;
glsl_BinaryOperator.OR_OP.__enum__ = glsl_BinaryOperator;
var glsl_UnaryOperator = { __ename__ : true, __constructs__ : ["INC_OP","DEC_OP","PLUS","DASH","BANG","TILDE"] };
glsl_UnaryOperator.INC_OP = ["INC_OP",0];
glsl_UnaryOperator.INC_OP.toString = $estr;
glsl_UnaryOperator.INC_OP.__enum__ = glsl_UnaryOperator;
glsl_UnaryOperator.DEC_OP = ["DEC_OP",1];
glsl_UnaryOperator.DEC_OP.toString = $estr;
glsl_UnaryOperator.DEC_OP.__enum__ = glsl_UnaryOperator;
glsl_UnaryOperator.PLUS = ["PLUS",2];
glsl_UnaryOperator.PLUS.toString = $estr;
glsl_UnaryOperator.PLUS.__enum__ = glsl_UnaryOperator;
glsl_UnaryOperator.DASH = ["DASH",3];
glsl_UnaryOperator.DASH.toString = $estr;
glsl_UnaryOperator.DASH.__enum__ = glsl_UnaryOperator;
glsl_UnaryOperator.BANG = ["BANG",4];
glsl_UnaryOperator.BANG.toString = $estr;
glsl_UnaryOperator.BANG.__enum__ = glsl_UnaryOperator;
glsl_UnaryOperator.TILDE = ["TILDE",5];
glsl_UnaryOperator.TILDE.toString = $estr;
glsl_UnaryOperator.TILDE.__enum__ = glsl_UnaryOperator;
var glsl_AssignmentOperator = { __ename__ : true, __constructs__ : ["EQUAL","MUL_ASSIGN","DIV_ASSIGN","MOD_ASSIGN","ADD_ASSIGN","SUB_ASSIGN","LEFT_ASSIGN","RIGHT_ASSIGN","AND_ASSIGN","XOR_ASSIGN","OR_ASSIGN"] };
glsl_AssignmentOperator.EQUAL = ["EQUAL",0];
glsl_AssignmentOperator.EQUAL.toString = $estr;
glsl_AssignmentOperator.EQUAL.__enum__ = glsl_AssignmentOperator;
glsl_AssignmentOperator.MUL_ASSIGN = ["MUL_ASSIGN",1];
glsl_AssignmentOperator.MUL_ASSIGN.toString = $estr;
glsl_AssignmentOperator.MUL_ASSIGN.__enum__ = glsl_AssignmentOperator;
glsl_AssignmentOperator.DIV_ASSIGN = ["DIV_ASSIGN",2];
glsl_AssignmentOperator.DIV_ASSIGN.toString = $estr;
glsl_AssignmentOperator.DIV_ASSIGN.__enum__ = glsl_AssignmentOperator;
glsl_AssignmentOperator.MOD_ASSIGN = ["MOD_ASSIGN",3];
glsl_AssignmentOperator.MOD_ASSIGN.toString = $estr;
glsl_AssignmentOperator.MOD_ASSIGN.__enum__ = glsl_AssignmentOperator;
glsl_AssignmentOperator.ADD_ASSIGN = ["ADD_ASSIGN",4];
glsl_AssignmentOperator.ADD_ASSIGN.toString = $estr;
glsl_AssignmentOperator.ADD_ASSIGN.__enum__ = glsl_AssignmentOperator;
glsl_AssignmentOperator.SUB_ASSIGN = ["SUB_ASSIGN",5];
glsl_AssignmentOperator.SUB_ASSIGN.toString = $estr;
glsl_AssignmentOperator.SUB_ASSIGN.__enum__ = glsl_AssignmentOperator;
glsl_AssignmentOperator.LEFT_ASSIGN = ["LEFT_ASSIGN",6];
glsl_AssignmentOperator.LEFT_ASSIGN.toString = $estr;
glsl_AssignmentOperator.LEFT_ASSIGN.__enum__ = glsl_AssignmentOperator;
glsl_AssignmentOperator.RIGHT_ASSIGN = ["RIGHT_ASSIGN",7];
glsl_AssignmentOperator.RIGHT_ASSIGN.toString = $estr;
glsl_AssignmentOperator.RIGHT_ASSIGN.__enum__ = glsl_AssignmentOperator;
glsl_AssignmentOperator.AND_ASSIGN = ["AND_ASSIGN",8];
glsl_AssignmentOperator.AND_ASSIGN.toString = $estr;
glsl_AssignmentOperator.AND_ASSIGN.__enum__ = glsl_AssignmentOperator;
glsl_AssignmentOperator.XOR_ASSIGN = ["XOR_ASSIGN",9];
glsl_AssignmentOperator.XOR_ASSIGN.toString = $estr;
glsl_AssignmentOperator.XOR_ASSIGN.__enum__ = glsl_AssignmentOperator;
glsl_AssignmentOperator.OR_ASSIGN = ["OR_ASSIGN",10];
glsl_AssignmentOperator.OR_ASSIGN.toString = $estr;
glsl_AssignmentOperator.OR_ASSIGN.__enum__ = glsl_AssignmentOperator;
var glsl_PrecisionQualifier = { __ename__ : true, __constructs__ : ["HIGH_PRECISION","MEDIUM_PRECISION","LOW_PRECISION"] };
glsl_PrecisionQualifier.HIGH_PRECISION = ["HIGH_PRECISION",0];
glsl_PrecisionQualifier.HIGH_PRECISION.toString = $estr;
glsl_PrecisionQualifier.HIGH_PRECISION.__enum__ = glsl_PrecisionQualifier;
glsl_PrecisionQualifier.MEDIUM_PRECISION = ["MEDIUM_PRECISION",1];
glsl_PrecisionQualifier.MEDIUM_PRECISION.toString = $estr;
glsl_PrecisionQualifier.MEDIUM_PRECISION.__enum__ = glsl_PrecisionQualifier;
glsl_PrecisionQualifier.LOW_PRECISION = ["LOW_PRECISION",2];
glsl_PrecisionQualifier.LOW_PRECISION.toString = $estr;
glsl_PrecisionQualifier.LOW_PRECISION.__enum__ = glsl_PrecisionQualifier;
var glsl_JumpMode = { __ename__ : true, __constructs__ : ["CONTINUE","BREAK","RETURN","DISCARD"] };
glsl_JumpMode.CONTINUE = ["CONTINUE",0];
glsl_JumpMode.CONTINUE.toString = $estr;
glsl_JumpMode.CONTINUE.__enum__ = glsl_JumpMode;
glsl_JumpMode.BREAK = ["BREAK",1];
glsl_JumpMode.BREAK.toString = $estr;
glsl_JumpMode.BREAK.__enum__ = glsl_JumpMode;
glsl_JumpMode.RETURN = ["RETURN",2];
glsl_JumpMode.RETURN.toString = $estr;
glsl_JumpMode.RETURN.__enum__ = glsl_JumpMode;
glsl_JumpMode.DISCARD = ["DISCARD",3];
glsl_JumpMode.DISCARD.toString = $estr;
glsl_JumpMode.DISCARD.__enum__ = glsl_JumpMode;
var glsl_DataType = { __ename__ : true, __constructs__ : ["VOID","FLOAT","INT","BOOL","VEC2","VEC3","VEC4","BVEC2","BVEC3","BVEC4","IVEC2","IVEC3","IVEC4","MAT2","MAT3","MAT4","SAMPLER2D","SAMPLERCUBE","USER_TYPE"] };
glsl_DataType.VOID = ["VOID",0];
glsl_DataType.VOID.toString = $estr;
glsl_DataType.VOID.__enum__ = glsl_DataType;
glsl_DataType.FLOAT = ["FLOAT",1];
glsl_DataType.FLOAT.toString = $estr;
glsl_DataType.FLOAT.__enum__ = glsl_DataType;
glsl_DataType.INT = ["INT",2];
glsl_DataType.INT.toString = $estr;
glsl_DataType.INT.__enum__ = glsl_DataType;
glsl_DataType.BOOL = ["BOOL",3];
glsl_DataType.BOOL.toString = $estr;
glsl_DataType.BOOL.__enum__ = glsl_DataType;
glsl_DataType.VEC2 = ["VEC2",4];
glsl_DataType.VEC2.toString = $estr;
glsl_DataType.VEC2.__enum__ = glsl_DataType;
glsl_DataType.VEC3 = ["VEC3",5];
glsl_DataType.VEC3.toString = $estr;
glsl_DataType.VEC3.__enum__ = glsl_DataType;
glsl_DataType.VEC4 = ["VEC4",6];
glsl_DataType.VEC4.toString = $estr;
glsl_DataType.VEC4.__enum__ = glsl_DataType;
glsl_DataType.BVEC2 = ["BVEC2",7];
glsl_DataType.BVEC2.toString = $estr;
glsl_DataType.BVEC2.__enum__ = glsl_DataType;
glsl_DataType.BVEC3 = ["BVEC3",8];
glsl_DataType.BVEC3.toString = $estr;
glsl_DataType.BVEC3.__enum__ = glsl_DataType;
glsl_DataType.BVEC4 = ["BVEC4",9];
glsl_DataType.BVEC4.toString = $estr;
glsl_DataType.BVEC4.__enum__ = glsl_DataType;
glsl_DataType.IVEC2 = ["IVEC2",10];
glsl_DataType.IVEC2.toString = $estr;
glsl_DataType.IVEC2.__enum__ = glsl_DataType;
glsl_DataType.IVEC3 = ["IVEC3",11];
glsl_DataType.IVEC3.toString = $estr;
glsl_DataType.IVEC3.__enum__ = glsl_DataType;
glsl_DataType.IVEC4 = ["IVEC4",12];
glsl_DataType.IVEC4.toString = $estr;
glsl_DataType.IVEC4.__enum__ = glsl_DataType;
glsl_DataType.MAT2 = ["MAT2",13];
glsl_DataType.MAT2.toString = $estr;
glsl_DataType.MAT2.__enum__ = glsl_DataType;
glsl_DataType.MAT3 = ["MAT3",14];
glsl_DataType.MAT3.toString = $estr;
glsl_DataType.MAT3.__enum__ = glsl_DataType;
glsl_DataType.MAT4 = ["MAT4",15];
glsl_DataType.MAT4.toString = $estr;
glsl_DataType.MAT4.__enum__ = glsl_DataType;
glsl_DataType.SAMPLER2D = ["SAMPLER2D",16];
glsl_DataType.SAMPLER2D.toString = $estr;
glsl_DataType.SAMPLER2D.__enum__ = glsl_DataType;
glsl_DataType.SAMPLERCUBE = ["SAMPLERCUBE",17];
glsl_DataType.SAMPLERCUBE.toString = $estr;
glsl_DataType.SAMPLERCUBE.__enum__ = glsl_DataType;
glsl_DataType.USER_TYPE = function(name) { var $x = ["USER_TYPE",18,name]; $x.__enum__ = glsl_DataType; $x.toString = $estr; return $x; };
var glsl_ParameterQualifier = { __ename__ : true, __constructs__ : ["IN","OUT","INOUT"] };
glsl_ParameterQualifier.IN = ["IN",0];
glsl_ParameterQualifier.IN.toString = $estr;
glsl_ParameterQualifier.IN.__enum__ = glsl_ParameterQualifier;
glsl_ParameterQualifier.OUT = ["OUT",1];
glsl_ParameterQualifier.OUT.toString = $estr;
glsl_ParameterQualifier.OUT.__enum__ = glsl_ParameterQualifier;
glsl_ParameterQualifier.INOUT = ["INOUT",2];
glsl_ParameterQualifier.INOUT.toString = $estr;
glsl_ParameterQualifier.INOUT.__enum__ = glsl_ParameterQualifier;
var glsl_StorageQualifier = { __ename__ : true, __constructs__ : ["CONST","ATTRIBUTE","VARYING","UNIFORM"] };
glsl_StorageQualifier.CONST = ["CONST",0];
glsl_StorageQualifier.CONST.toString = $estr;
glsl_StorageQualifier.CONST.__enum__ = glsl_StorageQualifier;
glsl_StorageQualifier.ATTRIBUTE = ["ATTRIBUTE",1];
glsl_StorageQualifier.ATTRIBUTE.toString = $estr;
glsl_StorageQualifier.ATTRIBUTE.__enum__ = glsl_StorageQualifier;
glsl_StorageQualifier.VARYING = ["VARYING",2];
glsl_StorageQualifier.VARYING.toString = $estr;
glsl_StorageQualifier.VARYING.__enum__ = glsl_StorageQualifier;
glsl_StorageQualifier.UNIFORM = ["UNIFORM",3];
glsl_StorageQualifier.UNIFORM.toString = $estr;
glsl_StorageQualifier.UNIFORM.__enum__ = glsl_StorageQualifier;
var glsl_NodeType = { __ename__ : true, __constructs__ : ["RootNode","TypeSpecifierNode","StructSpecifierNode","StructFieldDeclarationNode","StructDeclaratorNode","ExpressionNode","IdentifierNode","PrimitiveNode","BinaryExpressionNode","UnaryExpressionNode","SequenceExpressionNode","ConditionalExpressionNode","AssignmentExpressionNode","FieldSelectionExpressionNode","ArrayElementSelectionExpressionNode","FunctionCallNode","ConstructorNode","DeclarationNode","PrecisionDeclarationNode","VariableDeclarationNode","DeclaratorNode","ParameterDeclarationNode","FunctionDefinitionNode","FunctionPrototypeNode","FunctionHeaderNode","StatementNode","CompoundStatementNode","DeclarationStatementNode","ExpressionStatementNode","IterationStatementNode","WhileStatementNode","DoWhileStatementNode","ForStatementNode","IfStatementNode","JumpStatementNode","ReturnStatementNode","PreprocessorDirectiveNode"] };
glsl_NodeType.RootNode = function(n) { var $x = ["RootNode",0,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.TypeSpecifierNode = function(n) { var $x = ["TypeSpecifierNode",1,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.StructSpecifierNode = function(n) { var $x = ["StructSpecifierNode",2,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.StructFieldDeclarationNode = function(n) { var $x = ["StructFieldDeclarationNode",3,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.StructDeclaratorNode = function(n) { var $x = ["StructDeclaratorNode",4,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.ExpressionNode = function(n) { var $x = ["ExpressionNode",5,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.IdentifierNode = function(n) { var $x = ["IdentifierNode",6,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.PrimitiveNode = function(n) { var $x = ["PrimitiveNode",7,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.BinaryExpressionNode = function(n) { var $x = ["BinaryExpressionNode",8,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.UnaryExpressionNode = function(n) { var $x = ["UnaryExpressionNode",9,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.SequenceExpressionNode = function(n) { var $x = ["SequenceExpressionNode",10,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.ConditionalExpressionNode = function(n) { var $x = ["ConditionalExpressionNode",11,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.AssignmentExpressionNode = function(n) { var $x = ["AssignmentExpressionNode",12,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.FieldSelectionExpressionNode = function(n) { var $x = ["FieldSelectionExpressionNode",13,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.ArrayElementSelectionExpressionNode = function(n) { var $x = ["ArrayElementSelectionExpressionNode",14,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.FunctionCallNode = function(n) { var $x = ["FunctionCallNode",15,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.ConstructorNode = function(n) { var $x = ["ConstructorNode",16,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.DeclarationNode = function(n) { var $x = ["DeclarationNode",17,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.PrecisionDeclarationNode = function(n) { var $x = ["PrecisionDeclarationNode",18,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.VariableDeclarationNode = function(n) { var $x = ["VariableDeclarationNode",19,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.DeclaratorNode = function(n) { var $x = ["DeclaratorNode",20,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.ParameterDeclarationNode = function(n) { var $x = ["ParameterDeclarationNode",21,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.FunctionDefinitionNode = function(n) { var $x = ["FunctionDefinitionNode",22,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.FunctionPrototypeNode = function(n) { var $x = ["FunctionPrototypeNode",23,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.FunctionHeaderNode = function(n) { var $x = ["FunctionHeaderNode",24,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.StatementNode = function(n) { var $x = ["StatementNode",25,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.CompoundStatementNode = function(n) { var $x = ["CompoundStatementNode",26,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.DeclarationStatementNode = function(n) { var $x = ["DeclarationStatementNode",27,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.ExpressionStatementNode = function(n) { var $x = ["ExpressionStatementNode",28,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.IterationStatementNode = function(n) { var $x = ["IterationStatementNode",29,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.WhileStatementNode = function(n) { var $x = ["WhileStatementNode",30,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.DoWhileStatementNode = function(n) { var $x = ["DoWhileStatementNode",31,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.ForStatementNode = function(n) { var $x = ["ForStatementNode",32,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.IfStatementNode = function(n) { var $x = ["IfStatementNode",33,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.JumpStatementNode = function(n) { var $x = ["JumpStatementNode",34,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.ReturnStatementNode = function(n) { var $x = ["ReturnStatementNode",35,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
glsl_NodeType.PreprocessorDirectiveNode = function(n) { var $x = ["PreprocessorDirectiveNode",36,n]; $x.__enum__ = glsl_NodeType; $x.toString = $estr; return $x; };
var glsl_NodeTypeHelper = function() { };
glsl_NodeTypeHelper.__name__ = true;
glsl_NodeTypeHelper.safeNodeType = function(n) {
	return n != null?n.nodeType:null;
};
var glsl_lex_TokenType = { __ename__ : true, __constructs__ : ["ATTRIBUTE","CONST","BOOL","FLOAT","INT","BREAK","CONTINUE","DO","ELSE","FOR","IF","DISCARD","RETURN","BVEC2","BVEC3","BVEC4","IVEC2","IVEC3","IVEC4","VEC2","VEC3","VEC4","MAT2","MAT3","MAT4","IN","OUT","INOUT","UNIFORM","VARYING","SAMPLER2D","SAMPLERCUBE","STRUCT","VOID","WHILE","INVARIANT","HIGH_PRECISION","MEDIUM_PRECISION","LOW_PRECISION","PRECISION","BOOLCONSTANT","IDENTIFIER","TYPE_NAME","FIELD_SELECTION","LEFT_OP","RIGHT_OP","INC_OP","DEC_OP","LE_OP","GE_OP","EQ_OP","NE_OP","AND_OP","OR_OP","XOR_OP","MUL_ASSIGN","DIV_ASSIGN","ADD_ASSIGN","MOD_ASSIGN","SUB_ASSIGN","LEFT_ASSIGN","RIGHT_ASSIGN","AND_ASSIGN","XOR_ASSIGN","OR_ASSIGN","LEFT_PAREN","RIGHT_PAREN","LEFT_BRACKET","RIGHT_BRACKET","LEFT_BRACE","RIGHT_BRACE","DOT","COMMA","COLON","EQUAL","SEMICOLON","BANG","DASH","TILDE","PLUS","STAR","SLASH","PERCENT","LEFT_ANGLE","RIGHT_ANGLE","VERTICAL_BAR","CARET","AMPERSAND","QUESTION","INTCONSTANT","FLOATCONSTANT","WHITESPACE","BLOCK_COMMENT","LINE_COMMENT","PREPROCESSOR_DIRECTIVE","RESERVED_KEYWORD"] };
glsl_lex_TokenType.ATTRIBUTE = ["ATTRIBUTE",0];
glsl_lex_TokenType.ATTRIBUTE.toString = $estr;
glsl_lex_TokenType.ATTRIBUTE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.CONST = ["CONST",1];
glsl_lex_TokenType.CONST.toString = $estr;
glsl_lex_TokenType.CONST.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.BOOL = ["BOOL",2];
glsl_lex_TokenType.BOOL.toString = $estr;
glsl_lex_TokenType.BOOL.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.FLOAT = ["FLOAT",3];
glsl_lex_TokenType.FLOAT.toString = $estr;
glsl_lex_TokenType.FLOAT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.INT = ["INT",4];
glsl_lex_TokenType.INT.toString = $estr;
glsl_lex_TokenType.INT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.BREAK = ["BREAK",5];
glsl_lex_TokenType.BREAK.toString = $estr;
glsl_lex_TokenType.BREAK.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.CONTINUE = ["CONTINUE",6];
glsl_lex_TokenType.CONTINUE.toString = $estr;
glsl_lex_TokenType.CONTINUE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.DO = ["DO",7];
glsl_lex_TokenType.DO.toString = $estr;
glsl_lex_TokenType.DO.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.ELSE = ["ELSE",8];
glsl_lex_TokenType.ELSE.toString = $estr;
glsl_lex_TokenType.ELSE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.FOR = ["FOR",9];
glsl_lex_TokenType.FOR.toString = $estr;
glsl_lex_TokenType.FOR.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.IF = ["IF",10];
glsl_lex_TokenType.IF.toString = $estr;
glsl_lex_TokenType.IF.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.DISCARD = ["DISCARD",11];
glsl_lex_TokenType.DISCARD.toString = $estr;
glsl_lex_TokenType.DISCARD.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.RETURN = ["RETURN",12];
glsl_lex_TokenType.RETURN.toString = $estr;
glsl_lex_TokenType.RETURN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.BVEC2 = ["BVEC2",13];
glsl_lex_TokenType.BVEC2.toString = $estr;
glsl_lex_TokenType.BVEC2.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.BVEC3 = ["BVEC3",14];
glsl_lex_TokenType.BVEC3.toString = $estr;
glsl_lex_TokenType.BVEC3.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.BVEC4 = ["BVEC4",15];
glsl_lex_TokenType.BVEC4.toString = $estr;
glsl_lex_TokenType.BVEC4.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.IVEC2 = ["IVEC2",16];
glsl_lex_TokenType.IVEC2.toString = $estr;
glsl_lex_TokenType.IVEC2.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.IVEC3 = ["IVEC3",17];
glsl_lex_TokenType.IVEC3.toString = $estr;
glsl_lex_TokenType.IVEC3.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.IVEC4 = ["IVEC4",18];
glsl_lex_TokenType.IVEC4.toString = $estr;
glsl_lex_TokenType.IVEC4.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.VEC2 = ["VEC2",19];
glsl_lex_TokenType.VEC2.toString = $estr;
glsl_lex_TokenType.VEC2.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.VEC3 = ["VEC3",20];
glsl_lex_TokenType.VEC3.toString = $estr;
glsl_lex_TokenType.VEC3.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.VEC4 = ["VEC4",21];
glsl_lex_TokenType.VEC4.toString = $estr;
glsl_lex_TokenType.VEC4.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.MAT2 = ["MAT2",22];
glsl_lex_TokenType.MAT2.toString = $estr;
glsl_lex_TokenType.MAT2.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.MAT3 = ["MAT3",23];
glsl_lex_TokenType.MAT3.toString = $estr;
glsl_lex_TokenType.MAT3.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.MAT4 = ["MAT4",24];
glsl_lex_TokenType.MAT4.toString = $estr;
glsl_lex_TokenType.MAT4.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.IN = ["IN",25];
glsl_lex_TokenType.IN.toString = $estr;
glsl_lex_TokenType.IN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.OUT = ["OUT",26];
glsl_lex_TokenType.OUT.toString = $estr;
glsl_lex_TokenType.OUT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.INOUT = ["INOUT",27];
glsl_lex_TokenType.INOUT.toString = $estr;
glsl_lex_TokenType.INOUT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.UNIFORM = ["UNIFORM",28];
glsl_lex_TokenType.UNIFORM.toString = $estr;
glsl_lex_TokenType.UNIFORM.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.VARYING = ["VARYING",29];
glsl_lex_TokenType.VARYING.toString = $estr;
glsl_lex_TokenType.VARYING.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.SAMPLER2D = ["SAMPLER2D",30];
glsl_lex_TokenType.SAMPLER2D.toString = $estr;
glsl_lex_TokenType.SAMPLER2D.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.SAMPLERCUBE = ["SAMPLERCUBE",31];
glsl_lex_TokenType.SAMPLERCUBE.toString = $estr;
glsl_lex_TokenType.SAMPLERCUBE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.STRUCT = ["STRUCT",32];
glsl_lex_TokenType.STRUCT.toString = $estr;
glsl_lex_TokenType.STRUCT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.VOID = ["VOID",33];
glsl_lex_TokenType.VOID.toString = $estr;
glsl_lex_TokenType.VOID.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.WHILE = ["WHILE",34];
glsl_lex_TokenType.WHILE.toString = $estr;
glsl_lex_TokenType.WHILE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.INVARIANT = ["INVARIANT",35];
glsl_lex_TokenType.INVARIANT.toString = $estr;
glsl_lex_TokenType.INVARIANT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.HIGH_PRECISION = ["HIGH_PRECISION",36];
glsl_lex_TokenType.HIGH_PRECISION.toString = $estr;
glsl_lex_TokenType.HIGH_PRECISION.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.MEDIUM_PRECISION = ["MEDIUM_PRECISION",37];
glsl_lex_TokenType.MEDIUM_PRECISION.toString = $estr;
glsl_lex_TokenType.MEDIUM_PRECISION.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.LOW_PRECISION = ["LOW_PRECISION",38];
glsl_lex_TokenType.LOW_PRECISION.toString = $estr;
glsl_lex_TokenType.LOW_PRECISION.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.PRECISION = ["PRECISION",39];
glsl_lex_TokenType.PRECISION.toString = $estr;
glsl_lex_TokenType.PRECISION.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.BOOLCONSTANT = ["BOOLCONSTANT",40];
glsl_lex_TokenType.BOOLCONSTANT.toString = $estr;
glsl_lex_TokenType.BOOLCONSTANT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.IDENTIFIER = ["IDENTIFIER",41];
glsl_lex_TokenType.IDENTIFIER.toString = $estr;
glsl_lex_TokenType.IDENTIFIER.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.TYPE_NAME = ["TYPE_NAME",42];
glsl_lex_TokenType.TYPE_NAME.toString = $estr;
glsl_lex_TokenType.TYPE_NAME.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.FIELD_SELECTION = ["FIELD_SELECTION",43];
glsl_lex_TokenType.FIELD_SELECTION.toString = $estr;
glsl_lex_TokenType.FIELD_SELECTION.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.LEFT_OP = ["LEFT_OP",44];
glsl_lex_TokenType.LEFT_OP.toString = $estr;
glsl_lex_TokenType.LEFT_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.RIGHT_OP = ["RIGHT_OP",45];
glsl_lex_TokenType.RIGHT_OP.toString = $estr;
glsl_lex_TokenType.RIGHT_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.INC_OP = ["INC_OP",46];
glsl_lex_TokenType.INC_OP.toString = $estr;
glsl_lex_TokenType.INC_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.DEC_OP = ["DEC_OP",47];
glsl_lex_TokenType.DEC_OP.toString = $estr;
glsl_lex_TokenType.DEC_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.LE_OP = ["LE_OP",48];
glsl_lex_TokenType.LE_OP.toString = $estr;
glsl_lex_TokenType.LE_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.GE_OP = ["GE_OP",49];
glsl_lex_TokenType.GE_OP.toString = $estr;
glsl_lex_TokenType.GE_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.EQ_OP = ["EQ_OP",50];
glsl_lex_TokenType.EQ_OP.toString = $estr;
glsl_lex_TokenType.EQ_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.NE_OP = ["NE_OP",51];
glsl_lex_TokenType.NE_OP.toString = $estr;
glsl_lex_TokenType.NE_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.AND_OP = ["AND_OP",52];
glsl_lex_TokenType.AND_OP.toString = $estr;
glsl_lex_TokenType.AND_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.OR_OP = ["OR_OP",53];
glsl_lex_TokenType.OR_OP.toString = $estr;
glsl_lex_TokenType.OR_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.XOR_OP = ["XOR_OP",54];
glsl_lex_TokenType.XOR_OP.toString = $estr;
glsl_lex_TokenType.XOR_OP.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.MUL_ASSIGN = ["MUL_ASSIGN",55];
glsl_lex_TokenType.MUL_ASSIGN.toString = $estr;
glsl_lex_TokenType.MUL_ASSIGN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.DIV_ASSIGN = ["DIV_ASSIGN",56];
glsl_lex_TokenType.DIV_ASSIGN.toString = $estr;
glsl_lex_TokenType.DIV_ASSIGN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.ADD_ASSIGN = ["ADD_ASSIGN",57];
glsl_lex_TokenType.ADD_ASSIGN.toString = $estr;
glsl_lex_TokenType.ADD_ASSIGN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.MOD_ASSIGN = ["MOD_ASSIGN",58];
glsl_lex_TokenType.MOD_ASSIGN.toString = $estr;
glsl_lex_TokenType.MOD_ASSIGN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.SUB_ASSIGN = ["SUB_ASSIGN",59];
glsl_lex_TokenType.SUB_ASSIGN.toString = $estr;
glsl_lex_TokenType.SUB_ASSIGN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.LEFT_ASSIGN = ["LEFT_ASSIGN",60];
glsl_lex_TokenType.LEFT_ASSIGN.toString = $estr;
glsl_lex_TokenType.LEFT_ASSIGN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.RIGHT_ASSIGN = ["RIGHT_ASSIGN",61];
glsl_lex_TokenType.RIGHT_ASSIGN.toString = $estr;
glsl_lex_TokenType.RIGHT_ASSIGN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.AND_ASSIGN = ["AND_ASSIGN",62];
glsl_lex_TokenType.AND_ASSIGN.toString = $estr;
glsl_lex_TokenType.AND_ASSIGN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.XOR_ASSIGN = ["XOR_ASSIGN",63];
glsl_lex_TokenType.XOR_ASSIGN.toString = $estr;
glsl_lex_TokenType.XOR_ASSIGN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.OR_ASSIGN = ["OR_ASSIGN",64];
glsl_lex_TokenType.OR_ASSIGN.toString = $estr;
glsl_lex_TokenType.OR_ASSIGN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.LEFT_PAREN = ["LEFT_PAREN",65];
glsl_lex_TokenType.LEFT_PAREN.toString = $estr;
glsl_lex_TokenType.LEFT_PAREN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.RIGHT_PAREN = ["RIGHT_PAREN",66];
glsl_lex_TokenType.RIGHT_PAREN.toString = $estr;
glsl_lex_TokenType.RIGHT_PAREN.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.LEFT_BRACKET = ["LEFT_BRACKET",67];
glsl_lex_TokenType.LEFT_BRACKET.toString = $estr;
glsl_lex_TokenType.LEFT_BRACKET.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.RIGHT_BRACKET = ["RIGHT_BRACKET",68];
glsl_lex_TokenType.RIGHT_BRACKET.toString = $estr;
glsl_lex_TokenType.RIGHT_BRACKET.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.LEFT_BRACE = ["LEFT_BRACE",69];
glsl_lex_TokenType.LEFT_BRACE.toString = $estr;
glsl_lex_TokenType.LEFT_BRACE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.RIGHT_BRACE = ["RIGHT_BRACE",70];
glsl_lex_TokenType.RIGHT_BRACE.toString = $estr;
glsl_lex_TokenType.RIGHT_BRACE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.DOT = ["DOT",71];
glsl_lex_TokenType.DOT.toString = $estr;
glsl_lex_TokenType.DOT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.COMMA = ["COMMA",72];
glsl_lex_TokenType.COMMA.toString = $estr;
glsl_lex_TokenType.COMMA.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.COLON = ["COLON",73];
glsl_lex_TokenType.COLON.toString = $estr;
glsl_lex_TokenType.COLON.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.EQUAL = ["EQUAL",74];
glsl_lex_TokenType.EQUAL.toString = $estr;
glsl_lex_TokenType.EQUAL.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.SEMICOLON = ["SEMICOLON",75];
glsl_lex_TokenType.SEMICOLON.toString = $estr;
glsl_lex_TokenType.SEMICOLON.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.BANG = ["BANG",76];
glsl_lex_TokenType.BANG.toString = $estr;
glsl_lex_TokenType.BANG.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.DASH = ["DASH",77];
glsl_lex_TokenType.DASH.toString = $estr;
glsl_lex_TokenType.DASH.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.TILDE = ["TILDE",78];
glsl_lex_TokenType.TILDE.toString = $estr;
glsl_lex_TokenType.TILDE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.PLUS = ["PLUS",79];
glsl_lex_TokenType.PLUS.toString = $estr;
glsl_lex_TokenType.PLUS.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.STAR = ["STAR",80];
glsl_lex_TokenType.STAR.toString = $estr;
glsl_lex_TokenType.STAR.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.SLASH = ["SLASH",81];
glsl_lex_TokenType.SLASH.toString = $estr;
glsl_lex_TokenType.SLASH.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.PERCENT = ["PERCENT",82];
glsl_lex_TokenType.PERCENT.toString = $estr;
glsl_lex_TokenType.PERCENT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.LEFT_ANGLE = ["LEFT_ANGLE",83];
glsl_lex_TokenType.LEFT_ANGLE.toString = $estr;
glsl_lex_TokenType.LEFT_ANGLE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.RIGHT_ANGLE = ["RIGHT_ANGLE",84];
glsl_lex_TokenType.RIGHT_ANGLE.toString = $estr;
glsl_lex_TokenType.RIGHT_ANGLE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.VERTICAL_BAR = ["VERTICAL_BAR",85];
glsl_lex_TokenType.VERTICAL_BAR.toString = $estr;
glsl_lex_TokenType.VERTICAL_BAR.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.CARET = ["CARET",86];
glsl_lex_TokenType.CARET.toString = $estr;
glsl_lex_TokenType.CARET.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.AMPERSAND = ["AMPERSAND",87];
glsl_lex_TokenType.AMPERSAND.toString = $estr;
glsl_lex_TokenType.AMPERSAND.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.QUESTION = ["QUESTION",88];
glsl_lex_TokenType.QUESTION.toString = $estr;
glsl_lex_TokenType.QUESTION.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.INTCONSTANT = ["INTCONSTANT",89];
glsl_lex_TokenType.INTCONSTANT.toString = $estr;
glsl_lex_TokenType.INTCONSTANT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.FLOATCONSTANT = ["FLOATCONSTANT",90];
glsl_lex_TokenType.FLOATCONSTANT.toString = $estr;
glsl_lex_TokenType.FLOATCONSTANT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.WHITESPACE = ["WHITESPACE",91];
glsl_lex_TokenType.WHITESPACE.toString = $estr;
glsl_lex_TokenType.WHITESPACE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.BLOCK_COMMENT = ["BLOCK_COMMENT",92];
glsl_lex_TokenType.BLOCK_COMMENT.toString = $estr;
glsl_lex_TokenType.BLOCK_COMMENT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.LINE_COMMENT = ["LINE_COMMENT",93];
glsl_lex_TokenType.LINE_COMMENT.toString = $estr;
glsl_lex_TokenType.LINE_COMMENT.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.PREPROCESSOR_DIRECTIVE = ["PREPROCESSOR_DIRECTIVE",94];
glsl_lex_TokenType.PREPROCESSOR_DIRECTIVE.toString = $estr;
glsl_lex_TokenType.PREPROCESSOR_DIRECTIVE.__enum__ = glsl_lex_TokenType;
glsl_lex_TokenType.RESERVED_KEYWORD = ["RESERVED_KEYWORD",95];
glsl_lex_TokenType.RESERVED_KEYWORD.toString = $estr;
glsl_lex_TokenType.RESERVED_KEYWORD.__enum__ = glsl_lex_TokenType;
var glsl_lex_TokenHelper = function() { };
glsl_lex_TokenHelper.__name__ = true;
glsl_lex_TokenHelper.nextNonSkipToken = function(tokens,start,n,requiredType) {
	if(n == null) n = 1;
	var j = glsl_lex_TokenHelper.nextNonSkipTokenIndex(tokens,start,n,requiredType);
	return j != -1?tokens[j]:null;
};
glsl_lex_TokenHelper.nextNonSkipTokenIndex = function(tokens,start,n,requiredType) {
	if(n == null) n = 1;
	var direction = n >= 0?1:-1;
	var j = start;
	var m = Math.abs(n);
	var t;
	while(m > 0) {
		j += direction;
		t = tokens[j];
		if(t == null) return -1;
		if(requiredType != null && !Type.enumEq(t.type,requiredType)) continue;
		if(HxOverrides.indexOf(glsl_lex_Tokenizer.skippableTypes,t.type,0) != -1) continue;
		m--;
	}
	return j;
};
glsl_lex_TokenHelper.deleteTokens = function(tokens,start,count) {
	if(count == null) count = 1;
	return tokens.splice(start,count);
};
glsl_lex_TokenHelper.insertTokens = function(tokens,start,newTokens) {
	var j = newTokens.length;
	while(--j >= 0) tokens.splice(start,0,newTokens[j]);
	return tokens;
};
glsl_lex_TokenHelper.isIdentifierType = function(type) {
	return HxOverrides.indexOf(glsl_lex_TokenHelper.identifierTokenTypes,type,0) >= 0;
};
glsl_lex_TokenHelper.isTypeReferenceType = function(type) {
	return HxOverrides.indexOf(glsl_lex_TokenHelper.typeTokenTypes,type,0) >= 0;
};
var glsl_lex__$Tokenizer_ScanMode = { __ename__ : true, __constructs__ : ["UNDETERMINED","BLOCK_COMMENT","LINE_COMMENT","PREPROCESSOR_DIRECTIVE","WHITESPACE","OPERATOR","LITERAL","INTEGER_CONSTANT","DECIMAL_CONSTANT","HEX_CONSTANT","OCTAL_CONSTANT","FLOATING_CONSTANT","FRACTIONAL_CONSTANT","EXPONENT_PART"] };
glsl_lex__$Tokenizer_ScanMode.UNDETERMINED = ["UNDETERMINED",0];
glsl_lex__$Tokenizer_ScanMode.UNDETERMINED.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.UNDETERMINED.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.BLOCK_COMMENT = ["BLOCK_COMMENT",1];
glsl_lex__$Tokenizer_ScanMode.BLOCK_COMMENT.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.BLOCK_COMMENT.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.LINE_COMMENT = ["LINE_COMMENT",2];
glsl_lex__$Tokenizer_ScanMode.LINE_COMMENT.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.LINE_COMMENT.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.PREPROCESSOR_DIRECTIVE = ["PREPROCESSOR_DIRECTIVE",3];
glsl_lex__$Tokenizer_ScanMode.PREPROCESSOR_DIRECTIVE.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.PREPROCESSOR_DIRECTIVE.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.WHITESPACE = ["WHITESPACE",4];
glsl_lex__$Tokenizer_ScanMode.WHITESPACE.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.WHITESPACE.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.OPERATOR = ["OPERATOR",5];
glsl_lex__$Tokenizer_ScanMode.OPERATOR.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.OPERATOR.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.LITERAL = ["LITERAL",6];
glsl_lex__$Tokenizer_ScanMode.LITERAL.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.LITERAL.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.INTEGER_CONSTANT = ["INTEGER_CONSTANT",7];
glsl_lex__$Tokenizer_ScanMode.INTEGER_CONSTANT.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.INTEGER_CONSTANT.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.DECIMAL_CONSTANT = ["DECIMAL_CONSTANT",8];
glsl_lex__$Tokenizer_ScanMode.DECIMAL_CONSTANT.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.DECIMAL_CONSTANT.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.HEX_CONSTANT = ["HEX_CONSTANT",9];
glsl_lex__$Tokenizer_ScanMode.HEX_CONSTANT.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.HEX_CONSTANT.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.OCTAL_CONSTANT = ["OCTAL_CONSTANT",10];
glsl_lex__$Tokenizer_ScanMode.OCTAL_CONSTANT.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.OCTAL_CONSTANT.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.FLOATING_CONSTANT = ["FLOATING_CONSTANT",11];
glsl_lex__$Tokenizer_ScanMode.FLOATING_CONSTANT.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.FLOATING_CONSTANT.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.FRACTIONAL_CONSTANT = ["FRACTIONAL_CONSTANT",12];
glsl_lex__$Tokenizer_ScanMode.FRACTIONAL_CONSTANT.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.FRACTIONAL_CONSTANT.__enum__ = glsl_lex__$Tokenizer_ScanMode;
glsl_lex__$Tokenizer_ScanMode.EXPONENT_PART = ["EXPONENT_PART",13];
glsl_lex__$Tokenizer_ScanMode.EXPONENT_PART.toString = $estr;
glsl_lex__$Tokenizer_ScanMode.EXPONENT_PART.__enum__ = glsl_lex__$Tokenizer_ScanMode;
var glsl_lex_Tokenizer = function() { };
glsl_lex_Tokenizer.__name__ = true;
glsl_lex_Tokenizer.tokenize = function(source,onWarn,onError) {
	glsl_lex_Tokenizer.source = source;
	glsl_lex_Tokenizer.onWarn = onWarn;
	glsl_lex_Tokenizer.onError = onError;
	glsl_lex_Tokenizer.tokens = [];
	glsl_lex_Tokenizer.i = 0;
	glsl_lex_Tokenizer.line = 1;
	glsl_lex_Tokenizer.col = 1;
	glsl_lex_Tokenizer.userDefinedTypes = [];
	glsl_lex_Tokenizer.warnings = [];
	glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.UNDETERMINED;
	var lastMode;
	while(glsl_lex_Tokenizer.i < source.length || glsl_lex_Tokenizer.mode != glsl_lex__$Tokenizer_ScanMode.UNDETERMINED) {
		lastMode = glsl_lex_Tokenizer.mode;
		var _g = glsl_lex_Tokenizer.mode;
		switch(_g[1]) {
		case 0:
			glsl_lex_Tokenizer.determineMode();
			break;
		case 3:
			glsl_lex_Tokenizer.preprocessorMode();
			break;
		case 1:
			glsl_lex_Tokenizer.blockCommentMode();
			break;
		case 2:
			glsl_lex_Tokenizer.lineCommentMode();
			break;
		case 4:
			glsl_lex_Tokenizer.whitespaceMode();
			break;
		case 5:
			glsl_lex_Tokenizer.operatorMode();
			break;
		case 6:
			glsl_lex_Tokenizer.literalMode();
			break;
		case 11:
			glsl_lex_Tokenizer.floatingConstantMode();
			break;
		case 12:
			glsl_lex_Tokenizer.fractionalConstantMode();
			break;
		case 13:
			glsl_lex_Tokenizer.exponentPartMode();
			break;
		case 9:case 10:case 8:
			glsl_lex_Tokenizer.integerConstantMode();
			break;
		default:
			glsl_lex_Tokenizer.error("unhandled mode " + Std.string(glsl_lex_Tokenizer.mode));
		}
		if(glsl_lex_Tokenizer.mode == lastMode && glsl_lex_Tokenizer.i == glsl_lex_Tokenizer.last_i) {
			glsl_lex_Tokenizer.error("unclosed mode " + Std.string(glsl_lex_Tokenizer.mode));
			break;
		}
	}
	return glsl_lex_Tokenizer.tokens;
};
glsl_lex_Tokenizer.startLen = function(m) {
	return glsl_lex_Tokenizer.startConditionsMap.get(m)();
};
glsl_lex_Tokenizer.isStart = function(m) {
	return glsl_lex_Tokenizer.startLen(m) != null;
};
glsl_lex_Tokenizer.isEnd = function(m) {
	return glsl_lex_Tokenizer.endConditionsMap.get(m)();
};
glsl_lex_Tokenizer.tryMode = function(m) {
	var n = glsl_lex_Tokenizer.startConditionsMap.get(m)();
	if(n != null) {
		glsl_lex_Tokenizer.mode = m;
		glsl_lex_Tokenizer.advance(n);
		return true;
	}
	return false;
};
glsl_lex_Tokenizer.advance = function(n) {
	if(n == null) n = 1;
	glsl_lex_Tokenizer.last_i = glsl_lex_Tokenizer.i;
	while(n-- > 0 && glsl_lex_Tokenizer.i < glsl_lex_Tokenizer.source.length) {
		glsl_lex_Tokenizer.buf += glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i);
		glsl_lex_Tokenizer.i++;
	}
	var splitByLines = new EReg("\n","gm").split(glsl_lex_Tokenizer.source.substring(glsl_lex_Tokenizer.last_i,glsl_lex_Tokenizer.i));
	var nl = splitByLines.length - 1;
	if(nl > 0) {
		glsl_lex_Tokenizer.line += nl;
		glsl_lex_Tokenizer.col = splitByLines[nl].length + 1;
	} else glsl_lex_Tokenizer.col += glsl_lex_Tokenizer.i - glsl_lex_Tokenizer.last_i;
};
glsl_lex_Tokenizer.determineMode = function() {
	glsl_lex_Tokenizer.buf = "";
	glsl_lex_Tokenizer.lineStart = glsl_lex_Tokenizer.line;
	glsl_lex_Tokenizer.colStart = glsl_lex_Tokenizer.col;
	if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.BLOCK_COMMENT)) return;
	if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.LINE_COMMENT)) return;
	if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.PREPROCESSOR_DIRECTIVE)) return;
	if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.WHITESPACE)) return;
	if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.LITERAL)) return;
	if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.FLOATING_CONSTANT)) return;
	if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.OPERATOR)) return;
	if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.HEX_CONSTANT)) return;
	if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.OCTAL_CONSTANT)) return;
	if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.DECIMAL_CONSTANT)) return;
	glsl_lex_Tokenizer.warn("unrecognized token " + glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i));
	glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.UNDETERMINED;
	glsl_lex_Tokenizer.advance();
	return;
};
glsl_lex_Tokenizer.preprocessorMode = function() {
	if(glsl_lex_Tokenizer.endConditionsMap.get(glsl_lex_Tokenizer.mode)()) {
		glsl_lex_Tokenizer.buildToken(glsl_lex_TokenType.PREPROCESSOR_DIRECTIVE);
		glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.UNDETERMINED;
		return;
	}
	glsl_lex_Tokenizer.advance();
};
glsl_lex_Tokenizer.blockCommentMode = function() {
	if(glsl_lex_Tokenizer.endConditionsMap.get(glsl_lex_Tokenizer.mode)()) {
		glsl_lex_Tokenizer.buildToken(glsl_lex_TokenType.BLOCK_COMMENT);
		glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.UNDETERMINED;
		return;
	}
	glsl_lex_Tokenizer.advance();
};
glsl_lex_Tokenizer.lineCommentMode = function() {
	if(glsl_lex_Tokenizer.endConditionsMap.get(glsl_lex_Tokenizer.mode)()) {
		glsl_lex_Tokenizer.buildToken(glsl_lex_TokenType.LINE_COMMENT);
		glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.UNDETERMINED;
		return;
	}
	glsl_lex_Tokenizer.advance();
};
glsl_lex_Tokenizer.whitespaceMode = function() {
	if(glsl_lex_Tokenizer.endConditionsMap.get(glsl_lex_Tokenizer.mode)()) {
		glsl_lex_Tokenizer.buildToken(glsl_lex_TokenType.WHITESPACE);
		glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.UNDETERMINED;
		return;
	}
	glsl_lex_Tokenizer.advance();
};
glsl_lex_Tokenizer.operatorMode = function() {
	if(glsl_lex_Tokenizer.endConditionsMap.get(glsl_lex_Tokenizer.mode)()) {
		var tmp;
		var _this = glsl_lex_Tokenizer.operatorMap;
		var key = glsl_lex_Tokenizer.buf;
		if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
		glsl_lex_Tokenizer.buildToken(tmp);
		glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.UNDETERMINED;
		return;
	}
	glsl_lex_Tokenizer.advance();
};
glsl_lex_Tokenizer.literalMode = function() {
	if(glsl_lex_Tokenizer.endConditionsMap.get(glsl_lex_Tokenizer.mode)()) {
		var tt = null;
		var tmp;
		var _this = glsl_lex_Tokenizer.keywordMap;
		var key = glsl_lex_Tokenizer.buf;
		if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
		tt = tmp;
		if(tt == null && glsl_lex_Tokenizer.previousTokenType() == glsl_lex_TokenType.DOT) tt = glsl_lex_TokenType.FIELD_SELECTION;
		if(tt == null) tt = glsl_lex_TokenType.IDENTIFIER;
		glsl_lex_Tokenizer.buildToken(tt);
		glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.UNDETERMINED;
		return;
	}
	glsl_lex_Tokenizer.advance();
};
glsl_lex_Tokenizer.floatingConstantMode = function() {
	var _g = glsl_lex_Tokenizer.floatMode;
	switch(_g) {
	case 0:
		if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.FRACTIONAL_CONSTANT)) {
			glsl_lex_Tokenizer.floatMode = 1;
			return;
		}
		var j = glsl_lex_Tokenizer.i;
		while(new EReg("[0-9]","").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i))) glsl_lex_Tokenizer.advance();
		if(glsl_lex_Tokenizer.i > j) {
			glsl_lex_Tokenizer.floatMode = 2;
			return;
		}
		glsl_lex_Tokenizer.error("error parsing float, could not determine floatMode");
		break;
	case 1:
		glsl_lex_Tokenizer.floatMode = 3;
		if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.EXPONENT_PART)) return;
		break;
	case 2:
		if(glsl_lex_Tokenizer.tryMode(glsl_lex__$Tokenizer_ScanMode.EXPONENT_PART)) {
			glsl_lex_Tokenizer.floatMode = 3;
			return;
		} else glsl_lex_Tokenizer.error("float in floatMode 2 must have exponent part - none found");
		break;
	}
	if(glsl_lex_Tokenizer.endConditionsMap.get(glsl_lex_Tokenizer.mode)()) {
		glsl_lex_Tokenizer.buildToken(glsl_lex_TokenType.FLOATCONSTANT);
		glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.UNDETERMINED;
		glsl_lex_Tokenizer.floatMode = 0;
		return;
	}
	glsl_lex_Tokenizer.error("error parsing float");
};
glsl_lex_Tokenizer.fractionalConstantMode = function() {
	if(glsl_lex_Tokenizer.endConditionsMap.get(glsl_lex_Tokenizer.mode)()) {
		glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.FLOATING_CONSTANT;
		return;
	}
	glsl_lex_Tokenizer.advance();
};
glsl_lex_Tokenizer.exponentPartMode = function() {
	if(glsl_lex_Tokenizer.endConditionsMap.get(glsl_lex_Tokenizer.mode)()) {
		glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.FLOATING_CONSTANT;
		return;
	}
	glsl_lex_Tokenizer.advance();
};
glsl_lex_Tokenizer.integerConstantMode = function() {
	if(glsl_lex_Tokenizer.endConditionsMap.get(glsl_lex_Tokenizer.mode)()) {
		glsl_lex_Tokenizer.buildToken(glsl_lex_TokenType.INTCONSTANT);
		glsl_lex_Tokenizer.mode = glsl_lex__$Tokenizer_ScanMode.UNDETERMINED;
		return;
	}
	glsl_lex_Tokenizer.advance();
};
glsl_lex_Tokenizer.buildToken = function(type) {
	if(type == null) glsl_lex_Tokenizer.error("cannot have null token type");
	if(glsl_lex_Tokenizer.buf == "") glsl_lex_Tokenizer.error("cannot have empty token data");
	var token = { type : type, data : glsl_lex_Tokenizer.buf, line : glsl_lex_Tokenizer.lineStart, column : glsl_lex_Tokenizer.colStart, position : glsl_lex_Tokenizer.i - glsl_lex_Tokenizer.buf.length};
	if(glsl_lex_Tokenizer.verbose) console.log("building token " + Std.string(type) + " (" + glsl_lex_Tokenizer.buf + ")");
	glsl_lex_Tokenizer.tokens.push(token);
	if(type == glsl_lex_TokenType.RESERVED_KEYWORD) glsl_lex_Tokenizer.warn("using reserved keyword " + glsl_lex_Tokenizer.buf);
};
glsl_lex_Tokenizer.c = function(j) {
	return glsl_lex_Tokenizer.source.charAt(j);
};
glsl_lex_Tokenizer.previousToken = function(n,ignoreSkippable) {
	if(ignoreSkippable == null) ignoreSkippable = false;
	if(n == null) n = 0;
	if(!ignoreSkippable) return glsl_lex_Tokenizer.tokens[-n + glsl_lex_Tokenizer.tokens.length - 1]; else {
		var t = null;
		var i = 0;
		while(n >= 0 && i < glsl_lex_Tokenizer.tokens.length) {
			t = glsl_lex_Tokenizer.tokens[-i + glsl_lex_Tokenizer.tokens.length - 1];
			if(HxOverrides.indexOf(glsl_lex_Tokenizer.skippableTypes,t.type,0) == -1) n--;
			i++;
		}
		return t;
	}
};
glsl_lex_Tokenizer.previousTokenType = function(n,ignoreSkippable) {
	if(n == null) n = 0;
	var pt = glsl_lex_Tokenizer.previousToken(n,ignoreSkippable);
	return pt != null?pt.type:null;
};
glsl_lex_Tokenizer.warn = function(msg) {
	if(glsl_lex_Tokenizer.onWarn != null) glsl_lex_Tokenizer.onWarn(msg); else glsl_lex_Tokenizer.warnings.push("Tokenizer Warning: " + msg + ", line " + glsl_lex_Tokenizer.line + ", column " + glsl_lex_Tokenizer.col);
};
glsl_lex_Tokenizer.error = function(msg) {
	if(glsl_lex_Tokenizer.onError != null) glsl_lex_Tokenizer.onError(msg); else throw new js__$Boot_HaxeError("Tokenizer Error: " + msg + ", line " + glsl_lex_Tokenizer.line + ", column " + glsl_lex_Tokenizer.col);
};
var glsl_parse_Actions = function() { };
glsl_parse_Actions.__name__ = true;
glsl_parse_Actions.init = function() {
	glsl_parse_Actions.ruleno = -1;
	glsl_parse_Actions.parseContext = new glsl_parse_ParseContext();
	glsl_parse_Actions.lastToken = null;
};
glsl_parse_Actions.processToken = function(t) {
	if(Type.enumEq(t.type,glsl_lex_TokenType.IDENTIFIER)) {
		if(!glsl_parse_Actions.parseContext.declarationContext) {
			var afterType = glsl_parse_Actions.lastToken != null && HxOverrides.indexOf(glsl_lex_TokenHelper.typeTokenTypes,glsl_parse_Actions.lastToken.type,0) >= 0;
			var afterStruct = glsl_parse_Actions.lastToken != null && Type.enumEq(glsl_parse_Actions.lastToken.type,glsl_lex_TokenType.STRUCT);
			if(!afterType && !afterStruct) {
				var _g = glsl_parse_Actions.parseContext.searchScope(t.data);
				if(_g == null) {
				} else switch(_g[1]) {
				case 0:
					t.type = glsl_lex_TokenType.TYPE_NAME;
					break;
				default:
				}
			}
		}
	}
	glsl_parse_Actions.lastToken = t;
	return t;
};
glsl_parse_Actions.reduce = function(ruleno) {
	glsl_parse_Actions.ruleno = ruleno;
	var __ret;
	switch(ruleno) {
	case 0:
		__ret = new glsl_Root(glsl_parse_Actions.s(1));
		break;
	case 1:
		__ret = new glsl_Identifier(glsl_parse_Actions.s(1).data);
		break;
	case 2:case 7:case 9:case 13:case 14:case 15:case 16:case 17:case 18:case 21:case 40:case 48:case 52:case 55:case 58:case 63:case 66:case 68:case 70:case 72:case 74:case 76:case 78:case 80:case 93:case 95:case 99:case 100:case 101:case 117:case 126:case 133:case 153:case 167:case 169:case 171:case 172:case 173:case 174:case 175:case 176:case 177:case 178:case 179:case 180:case 194:case 199:case 200:case 201:
		__ret = glsl_parse_Actions.s(1);
		break;
	case 3:
		var l = new glsl_Primitive(Std.parseInt(glsl_parse_Actions.s(1).data),glsl_DataType.INT);
		l.raw = glsl_parse_Actions.s(1).data;
		__ret = l;
		break;
	case 4:
		var l1 = new glsl_Primitive((function($this) {
			var $r;
			var x = glsl_parse_Actions.s(1).data;
			$r = parseFloat(x);
			return $r;
		}(this)),glsl_DataType.FLOAT);
		l1.raw = glsl_parse_Actions.s(1).data;
		__ret = l1;
		break;
	case 5:
		var l2 = new glsl_Primitive(glsl_parse_Actions.s(1).data == "true",glsl_DataType.BOOL);
		l2.raw = glsl_parse_Actions.s(1).data;
		__ret = l2;
		break;
	case 6:
		glsl_parse_Actions.s(2).enclosed = true;
		__ret = glsl_parse_Actions.s(2);
		break;
	case 8:
		__ret = new glsl_ArrayElementSelectionExpression(glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 10:
		__ret = new glsl_FieldSelectionExpression(glsl_parse_Actions.s(1),new glsl_Identifier(glsl_parse_Actions.s(3).data));
		break;
	case 11:
		__ret = new glsl_UnaryExpression(glsl_UnaryOperator.INC_OP,glsl_parse_Actions.s(1),false);
		break;
	case 12:
		__ret = new glsl_UnaryExpression(glsl_UnaryOperator.DEC_OP,glsl_parse_Actions.s(1),false);
		break;
	case 19:
		(js_Boot.__cast(glsl_parse_Actions.s(1) , glsl_ExpressionParameters)).parameters.push(glsl_parse_Actions.s(2));
		__ret = glsl_parse_Actions.s(1);
		break;
	case 20:
		(js_Boot.__cast(glsl_parse_Actions.s(1) , glsl_ExpressionParameters)).parameters.push(glsl_parse_Actions.s(3));
		__ret = glsl_parse_Actions.s(1);
		break;
	case 22:
		__ret = new glsl_Constructor(glsl_parse_Actions.s(1) != null?glsl_parse_Actions.s(1):null);
		break;
	case 23:
		__ret = new glsl_FunctionCall(glsl_parse_Actions.s(1).data);
		break;
	case 24:
		__ret = glsl_DataType.FLOAT;
		break;
	case 25:
		__ret = glsl_DataType.INT;
		break;
	case 26:
		__ret = glsl_DataType.BOOL;
		break;
	case 27:
		__ret = glsl_DataType.VEC2;
		break;
	case 28:
		__ret = glsl_DataType.VEC3;
		break;
	case 29:
		__ret = glsl_DataType.VEC4;
		break;
	case 30:
		__ret = glsl_DataType.BVEC2;
		break;
	case 31:
		__ret = glsl_DataType.BVEC3;
		break;
	case 32:
		__ret = glsl_DataType.BVEC4;
		break;
	case 33:
		__ret = glsl_DataType.IVEC2;
		break;
	case 34:
		__ret = glsl_DataType.IVEC3;
		break;
	case 35:
		__ret = glsl_DataType.IVEC4;
		break;
	case 36:
		__ret = glsl_DataType.MAT2;
		break;
	case 37:
		__ret = glsl_DataType.MAT3;
		break;
	case 38:
		__ret = glsl_DataType.MAT4;
		break;
	case 39:
		__ret = glsl_DataType.USER_TYPE(glsl_parse_Actions.s(1).data);
		break;
	case 41:
		__ret = new glsl_UnaryExpression(glsl_UnaryOperator.INC_OP,glsl_parse_Actions.s(2),true);
		break;
	case 42:
		__ret = new glsl_UnaryExpression(glsl_UnaryOperator.DEC_OP,glsl_parse_Actions.s(2),true);
		break;
	case 43:
		__ret = new glsl_UnaryExpression(glsl_parse_Actions.s(1) != null?glsl_parse_Actions.s(1):null,glsl_parse_Actions.s(2),true);
		break;
	case 44:
		__ret = glsl_UnaryOperator.PLUS;
		break;
	case 45:
		__ret = glsl_UnaryOperator.DASH;
		break;
	case 46:
		__ret = glsl_UnaryOperator.BANG;
		break;
	case 47:
		__ret = glsl_UnaryOperator.TILDE;
		break;
	case 49:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.STAR,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 50:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.SLASH,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 51:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.PERCENT,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 53:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.PLUS,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 54:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.DASH,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 56:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.LEFT_OP,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 57:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.RIGHT_OP,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 59:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.LEFT_ANGLE,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 60:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.RIGHT_ANGLE,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 61:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.LE_OP,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 62:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.GE_OP,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 64:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.EQ_OP,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 65:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.NE_OP,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 67:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.AMPERSAND,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 69:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.CARET,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 71:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.VERTICAL_BAR,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 73:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.AND_OP,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 75:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.XOR_OP,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 77:
		__ret = new glsl_BinaryExpression(glsl_BinaryOperator.OR_OP,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 79:
		__ret = new glsl_ConditionalExpression(glsl_parse_Actions.s(1),glsl_parse_Actions.s(3),glsl_parse_Actions.s(5));
		break;
	case 81:
		__ret = new glsl_AssignmentExpression(glsl_parse_Actions.s(2) != null?glsl_parse_Actions.s(2):null,glsl_parse_Actions.s(1),glsl_parse_Actions.s(3));
		break;
	case 82:
		__ret = glsl_AssignmentOperator.EQUAL;
		break;
	case 83:
		__ret = glsl_AssignmentOperator.MUL_ASSIGN;
		break;
	case 84:
		__ret = glsl_AssignmentOperator.DIV_ASSIGN;
		break;
	case 85:
		__ret = glsl_AssignmentOperator.MOD_ASSIGN;
		break;
	case 86:
		__ret = glsl_AssignmentOperator.ADD_ASSIGN;
		break;
	case 87:
		__ret = glsl_AssignmentOperator.SUB_ASSIGN;
		break;
	case 88:
		__ret = glsl_AssignmentOperator.LEFT_ASSIGN;
		break;
	case 89:
		__ret = glsl_AssignmentOperator.RIGHT_ASSIGN;
		break;
	case 90:
		__ret = glsl_AssignmentOperator.AND_ASSIGN;
		break;
	case 91:
		__ret = glsl_AssignmentOperator.XOR_ASSIGN;
		break;
	case 92:
		__ret = glsl_AssignmentOperator.OR_ASSIGN;
		break;
	case 94:
		if((function($this) {
			var $r;
			var v = glsl_parse_Actions.s(1);
			$r = js_Boot.__instanceof(v,glsl_SequenceExpression);
			return $r;
		}(this))) {
			(js_Boot.__cast(glsl_parse_Actions.s(1) , glsl_SequenceExpression)).expressions.push(glsl_parse_Actions.s(3));
			__ret = glsl_parse_Actions.s(1);
		} else __ret = new glsl_SequenceExpression([glsl_parse_Actions.s(1),glsl_parse_Actions.s(3)]);
		break;
	case 96:
		__ret = new glsl_FunctionPrototype(glsl_parse_Actions.s(1));
		break;
	case 97:
		__ret = glsl_parse_Actions.s(1);
		break;
	case 98:
		__ret = new glsl_PrecisionDeclaration(glsl_parse_Actions.s(2) != null?glsl_parse_Actions.s(2):null,(js_Boot.__cast(glsl_parse_Actions.s(3) , glsl_TypeSpecifier)).dataType);
		glsl_parse_Actions.parseContext.declarePrecision(__ret);
		break;
	case 102:
		var fh = js_Boot.__cast(glsl_parse_Actions.s(1) , glsl_FunctionHeader);
		fh.parameters.push(glsl_parse_Actions.s(2));
		__ret = fh;
		break;
	case 103:
		var fh1 = js_Boot.__cast(glsl_parse_Actions.s(1) , glsl_FunctionHeader);
		fh1.parameters.push(glsl_parse_Actions.s(3));
		__ret = fh1;
		break;
	case 104:
		__ret = new glsl_FunctionHeader(glsl_parse_Actions.s(2).data,glsl_parse_Actions.s(1));
		break;
	case 105:
		__ret = new glsl_ParameterDeclaration(glsl_parse_Actions.s(2).data,glsl_parse_Actions.s(1));
		break;
	case 106:
		__ret = new glsl_ParameterDeclaration(glsl_parse_Actions.s(2).data,glsl_parse_Actions.s(1),null,glsl_parse_Actions.s(4));
		break;
	case 107:case 109:
		var pd = js_Boot.__cast(glsl_parse_Actions.s(3) , glsl_ParameterDeclaration);
		pd.parameterQualifier = glsl_parse_Actions.s(2) != null?glsl_parse_Actions.s(2):null;
		if((function($this) {
			var $r;
			var a = glsl_parse_Actions.s(1) != null?glsl_parse_Actions.s(1):null;
			$r = Type.enumEq(a,glsl_parse_Instructions.SET_INVARIANT_VARYING);
			return $r;
		}(this))) {
			pd.typeSpecifier.storage = glsl_StorageQualifier.VARYING;
			pd.typeSpecifier.invariant = true;
		} else pd.typeSpecifier.storage = glsl_parse_Actions.s(1) != null?glsl_parse_Actions.s(1):null;
		__ret = pd;
		break;
	case 108:
		var pd1 = js_Boot.__cast(glsl_parse_Actions.s(2) , glsl_ParameterDeclaration);
		pd1.parameterQualifier = glsl_parse_Actions.s(1) != null?glsl_parse_Actions.s(1):null;
		__ret = pd1;
		break;
	case 110:
		var pd2 = js_Boot.__cast(glsl_parse_Actions.s(2) , glsl_ParameterDeclaration);
		pd2.parameterQualifier = glsl_parse_Actions.s(1) != null?glsl_parse_Actions.s(1):null;
		__ret = pd2;
		break;
	case 111:case 202:
		__ret = null;
		break;
	case 112:
		__ret = glsl_ParameterQualifier.IN;
		break;
	case 113:
		__ret = glsl_ParameterQualifier.OUT;
		break;
	case 114:
		__ret = glsl_ParameterQualifier.INOUT;
		break;
	case 115:
		__ret = new glsl_ParameterDeclaration(null,glsl_parse_Actions.s(1));
		break;
	case 116:
		__ret = new glsl_ParameterDeclaration(null,glsl_parse_Actions.s(1),null,glsl_parse_Actions.s(3));
		break;
	case 118:
		var declarator = new glsl_Declarator(glsl_parse_Actions.s(3).data,null,null);
		var declaration = js_Boot.__cast(glsl_parse_Actions.s(1) , glsl_VariableDeclaration);
		declaration.declarators.push(declarator);
		glsl_parse_Actions.handleVariableDeclaration(declarator,declaration.typeSpecifier);
		__ret = glsl_parse_Actions.s(1);
		break;
	case 119:
		var declarator1 = new glsl_Declarator(glsl_parse_Actions.s(3).data,null,glsl_parse_Actions.s(5));
		var declaration1 = js_Boot.__cast(glsl_parse_Actions.s(1) , glsl_VariableDeclaration);
		declaration1.declarators.push(declarator1);
		glsl_parse_Actions.handleVariableDeclaration(declarator1,declaration1.typeSpecifier);
		__ret = glsl_parse_Actions.s(1);
		break;
	case 120:
		var declarator2 = new glsl_Declarator(glsl_parse_Actions.s(3).data,glsl_parse_Actions.s(5),null);
		var declaration2 = js_Boot.__cast(glsl_parse_Actions.s(1) , glsl_VariableDeclaration);
		declaration2.declarators.push(declarator2);
		glsl_parse_Actions.handleVariableDeclaration(declarator2,declaration2.typeSpecifier);
		__ret = glsl_parse_Actions.s(1);
		break;
	case 121:
		__ret = new glsl_VariableDeclaration(glsl_parse_Actions.s(1),[]);
		glsl_parse_Actions.handleVariableDeclaration(null,__ret.typeSpecifier);
		break;
	case 122:
		var declarator3 = new glsl_Declarator(glsl_parse_Actions.s(2).data,null,null);
		__ret = new glsl_VariableDeclaration(glsl_parse_Actions.s(1),[declarator3]);
		glsl_parse_Actions.handleVariableDeclaration(declarator3,__ret.typeSpecifier);
		break;
	case 123:
		var declarator4 = new glsl_Declarator(glsl_parse_Actions.s(2).data,null,glsl_parse_Actions.s(4));
		__ret = new glsl_VariableDeclaration(glsl_parse_Actions.s(1),[declarator4]);
		glsl_parse_Actions.handleVariableDeclaration(declarator4,__ret.typeSpecifier);
		break;
	case 124:
		var declarator5 = new glsl_Declarator(glsl_parse_Actions.s(2).data,glsl_parse_Actions.s(4),null);
		__ret = new glsl_VariableDeclaration(glsl_parse_Actions.s(1),[declarator5]);
		glsl_parse_Actions.handleVariableDeclaration(declarator5,__ret.typeSpecifier);
		break;
	case 125:
		var declarator6 = new glsl_Declarator(glsl_parse_Actions.s(2).data,null,null);
		__ret = new glsl_VariableDeclaration(new glsl_TypeSpecifier(null,null,null,true),[declarator6]);
		glsl_parse_Actions.handleVariableDeclaration(declarator6,__ret.typeSpecifier);
		break;
	case 127:
		var ts = js_Boot.__cast(glsl_parse_Actions.s(2) , glsl_TypeSpecifier);
		if((function($this) {
			var $r;
			var a1 = glsl_parse_Actions.s(1) != null?glsl_parse_Actions.s(1):null;
			$r = Type.enumEq(a1,glsl_parse_Instructions.SET_INVARIANT_VARYING);
			return $r;
		}(this))) {
			ts.storage = glsl_StorageQualifier.VARYING;
			ts.invariant = true;
		} else ts.storage = glsl_parse_Actions.s(1) != null?glsl_parse_Actions.s(1):null;
		__ret = glsl_parse_Actions.s(2);
		break;
	case 128:
		__ret = glsl_StorageQualifier.CONST;
		break;
	case 129:
		__ret = glsl_StorageQualifier.ATTRIBUTE;
		break;
	case 130:
		__ret = glsl_StorageQualifier.VARYING;
		break;
	case 131:
		__ret = glsl_parse_Instructions.SET_INVARIANT_VARYING;
		break;
	case 132:
		__ret = glsl_StorageQualifier.UNIFORM;
		break;
	case 134:
		var ts1 = js_Boot.__cast(glsl_parse_Actions.s(2) , glsl_TypeSpecifier);
		ts1.precision = glsl_parse_Actions.s(1) != null?glsl_parse_Actions.s(1):null;
		__ret = ts1;
		break;
	case 135:
		__ret = new glsl_TypeSpecifier(glsl_DataType.VOID);
		break;
	case 136:
		__ret = new glsl_TypeSpecifier(glsl_DataType.FLOAT);
		break;
	case 137:
		__ret = new glsl_TypeSpecifier(glsl_DataType.INT);
		break;
	case 138:
		__ret = new glsl_TypeSpecifier(glsl_DataType.BOOL);
		break;
	case 139:
		__ret = new glsl_TypeSpecifier(glsl_DataType.VEC2);
		break;
	case 140:
		__ret = new glsl_TypeSpecifier(glsl_DataType.VEC3);
		break;
	case 141:
		__ret = new glsl_TypeSpecifier(glsl_DataType.VEC4);
		break;
	case 142:
		__ret = new glsl_TypeSpecifier(glsl_DataType.BVEC2);
		break;
	case 143:
		__ret = new glsl_TypeSpecifier(glsl_DataType.BVEC3);
		break;
	case 144:
		__ret = new glsl_TypeSpecifier(glsl_DataType.BVEC4);
		break;
	case 145:
		__ret = new glsl_TypeSpecifier(glsl_DataType.IVEC2);
		break;
	case 146:
		__ret = new glsl_TypeSpecifier(glsl_DataType.IVEC3);
		break;
	case 147:
		__ret = new glsl_TypeSpecifier(glsl_DataType.IVEC4);
		break;
	case 148:
		__ret = new glsl_TypeSpecifier(glsl_DataType.MAT2);
		break;
	case 149:
		__ret = new glsl_TypeSpecifier(glsl_DataType.MAT3);
		break;
	case 150:
		__ret = new glsl_TypeSpecifier(glsl_DataType.MAT4);
		break;
	case 151:
		__ret = new glsl_TypeSpecifier(glsl_DataType.SAMPLER2D);
		break;
	case 152:
		__ret = new glsl_TypeSpecifier(glsl_DataType.SAMPLERCUBE);
		break;
	case 154:
		__ret = new glsl_TypeSpecifier(glsl_DataType.USER_TYPE(glsl_parse_Actions.s(1).data));
		break;
	case 155:
		__ret = glsl_PrecisionQualifier.HIGH_PRECISION;
		break;
	case 156:
		__ret = glsl_PrecisionQualifier.MEDIUM_PRECISION;
		break;
	case 157:
		__ret = glsl_PrecisionQualifier.LOW_PRECISION;
		break;
	case 158:
		var ss = new glsl_StructSpecifier(glsl_parse_Actions.s(2).data,glsl_parse_Actions.s(4));
		__ret = ss;
		break;
	case 159:
		var ss1 = new glsl_StructSpecifier(null,glsl_parse_Actions.s(3));
		__ret = ss1;
		break;
	case 160:case 163:case 187:case 210:
		__ret = [glsl_parse_Actions.s(1)];
		break;
	case 161:
		glsl_parse_Actions.s(1).push(glsl_parse_Actions.s(2));
		__ret = glsl_parse_Actions.s(1);
		break;
	case 162:
		__ret = new glsl_StructFieldDeclaration(glsl_parse_Actions.s(2),glsl_parse_Actions.s(3));
		break;
	case 164:
		glsl_parse_Actions.s(1).push(glsl_parse_Actions.s(3));
		__ret = glsl_parse_Actions.s(1);
		break;
	case 165:
		__ret = new glsl_StructDeclarator(glsl_parse_Actions.s(1).data);
		break;
	case 166:
		__ret = new glsl_StructDeclarator(glsl_parse_Actions.s(1).data,glsl_parse_Actions.s(3));
		break;
	case 168:
		__ret = new glsl_DeclarationStatement(glsl_parse_Actions.s(1));
		break;
	case 170:
		__ret = glsl_parse_Actions.s(2);
		break;
	case 181:case 183:case 185:
		__ret = new glsl_CompoundStatement([]);
		break;
	case 182:
		__ret = new glsl_CompoundStatement(glsl_parse_Actions.s(3));
		break;
	case 184:case 186:
		__ret = new glsl_CompoundStatement(glsl_parse_Actions.s(2));
		break;
	case 188:
		glsl_parse_Actions.s(1).push(glsl_parse_Actions.s(2));
		__ret = glsl_parse_Actions.s(1);
		break;
	case 189:
		__ret = new glsl_ExpressionStatement(null);
		break;
	case 190:
		__ret = new glsl_ExpressionStatement(glsl_parse_Actions.s(1));
		break;
	case 191:
		__ret = new glsl_IfStatement(glsl_parse_Actions.s(3),glsl_parse_Actions.s(5)[0],glsl_parse_Actions.s(5)[1]);
		break;
	case 192:
		__ret = [glsl_parse_Actions.s(1),glsl_parse_Actions.s(3)];
		break;
	case 193:
		__ret = [glsl_parse_Actions.s(1),null];
		break;
	case 195:
		var declarator7 = new glsl_Declarator(glsl_parse_Actions.s(2).data,glsl_parse_Actions.s(4),null);
		var declaration3 = new glsl_VariableDeclaration(glsl_parse_Actions.s(1),[declarator7]);
		glsl_parse_Actions.handleVariableDeclaration(declarator7,declaration3.typeSpecifier);
		__ret = declaration3;
		break;
	case 196:
		__ret = new glsl_WhileStatement(glsl_parse_Actions.s(4),glsl_parse_Actions.s(6));
		break;
	case 197:
		__ret = new glsl_DoWhileStatement(glsl_parse_Actions.s(5),glsl_parse_Actions.s(2));
		break;
	case 198:
		__ret = new glsl_ForStatement(glsl_parse_Actions.s(4),glsl_parse_Actions.s(5)[0],glsl_parse_Actions.s(5)[1],glsl_parse_Actions.s(7));
		break;
	case 203:
		__ret = [glsl_parse_Actions.s(1),null];
		break;
	case 204:
		__ret = [glsl_parse_Actions.s(1),glsl_parse_Actions.s(3)];
		break;
	case 205:
		__ret = new glsl_JumpStatement(glsl_JumpMode.CONTINUE);
		break;
	case 206:
		__ret = new glsl_JumpStatement(glsl_JumpMode.BREAK);
		break;
	case 207:
		__ret = new glsl_ReturnStatement(null);
		break;
	case 208:
		__ret = new glsl_ReturnStatement(glsl_parse_Actions.s(2));
		break;
	case 209:
		__ret = new glsl_JumpStatement(glsl_JumpMode.DISCARD);
		break;
	case 211:
		glsl_parse_Actions.s(1).push(glsl_parse_Actions.s(2));
		__ret = glsl_parse_Actions.s(1);
		break;
	case 212:case 213:case 214:
		(js_Boot.__cast(glsl_parse_Actions.s(1) , glsl_Declaration)).external = true;
		__ret = glsl_parse_Actions.s(1);
		break;
	case 215:
		glsl_parse_Actions.parseContext.scopePush();
		var parameters = glsl_parse_Actions.s(1).parameters;
		var _g = 0;
		while(_g < parameters.length) {
			var p = parameters[_g];
			++_g;
			glsl_parse_Actions.handleVariableDeclaration(p,p.typeSpecifier);
		}
		__ret = glsl_parse_Actions.s(1);
		break;
	case 216:
		__ret = new glsl_FunctionDefinition(glsl_parse_Actions.s(1),glsl_parse_Actions.s(2));
		break;
	case 217:
		__ret = new glsl_PreprocessorDirective(glsl_parse_Actions.s(1).data);
		break;
	case 218:
		glsl_parse_Actions.parseContext.scopePush();
		__ret = null;
		break;
	case 219:
		glsl_parse_Actions.parseContext.scopePop();
		__ret = null;
		break;
	case 220:
		glsl_parse_Actions.parseContext.enterDeclarationContext();
		__ret = null;
		break;
	case 221:
		glsl_parse_Actions.parseContext.exitDeclarationContext();
		__ret = null;
		break;
	}
	return __ret;
	glsl_parse_Parser.warn("unhandled reduce rule number " + ruleno);
	return null;
};
glsl_parse_Actions.handleVariableDeclaration = function(declarator,ts) {
	{
		var _g = glsl_NodeTypeHelper.safeNodeType(ts);
		if(_g == null) {
		} else switch(_g[1]) {
		case 2:
			glsl_parse_Actions.parseContext.declareType(_g[2]);
			break;
		default:
		}
	}
	if(declarator != null) glsl_parse_Actions.parseContext.declareVariable(declarator);
};
glsl_parse_Actions.s = function(n) {
	if(n <= 0) return null;
	var j = glsl_parse__$Parser_RuleInfoEntry_$Impl_$.get_nrhs(glsl_parse_Parser.ruleInfo[glsl_parse_Actions.ruleno]) - n;
	return glsl_parse_Parser.stack[glsl_parse_Parser.i - j].minor;
};
glsl_parse_Actions.n = function(m) {
	return glsl_parse_Actions.s(m);
};
glsl_parse_Actions.t = function(m) {
	return glsl_parse_Actions.s(m);
};
glsl_parse_Actions.e = function(m) {
	return glsl_parse_Actions.s(m);
};
glsl_parse_Actions.ev = function(m) {
	return glsl_parse_Actions.s(m) != null?glsl_parse_Actions.s(m):null;
};
glsl_parse_Actions.a = function(m) {
	return glsl_parse_Actions.s(m);
};
glsl_parse_Actions.get_i = function() {
	return glsl_parse_Parser.i;
};
glsl_parse_Actions.get_stack = function() {
	return glsl_parse_Parser.stack;
};
var glsl_parse_Instructions = { __ename__ : true, __constructs__ : ["SET_INVARIANT_VARYING"] };
glsl_parse_Instructions.SET_INVARIANT_VARYING = ["SET_INVARIANT_VARYING",0];
glsl_parse_Instructions.SET_INVARIANT_VARYING.toString = $estr;
glsl_parse_Instructions.SET_INVARIANT_VARYING.__enum__ = glsl_parse_Instructions;
var glsl_parse_Object = { __ename__ : true, __constructs__ : ["USER_TYPE","VARIABLE"] };
glsl_parse_Object.USER_TYPE = function(specifier) { var $x = ["USER_TYPE",0,specifier]; $x.__enum__ = glsl_parse_Object; $x.toString = $estr; return $x; };
glsl_parse_Object.VARIABLE = function(declarator) { var $x = ["VARIABLE",1,declarator]; $x.__enum__ = glsl_parse_Object; $x.toString = $estr; return $x; };
var glsl_parse_ParseContext = function() {
	this.scopes = [];
	this.scopePush();
	this.declarationContext = false;
	this.defaultPrecision = new haxe_ds_EnumValueMap();
};
glsl_parse_ParseContext.__name__ = true;
glsl_parse_ParseContext.prototype = {
	scopePush: function() {
		this.scopes.push(new haxe_ds_StringMap());
	}
	,scopePop: function() {
		if(this.scopes.length <= 1) {
			console.log("Parse scope error: trying to pop global scope!");
			return;
		}
		this.scopes.pop();
	}
	,searchScope: function(name) {
		var r = null;
		var i = this.scopes.length;
		while(--i >= 0) {
			var tmp;
			var _this = this.scopes[i];
			if(__map_reserved[name] != null) tmp = _this.getReserved(name); else tmp = _this.h[name];
			if((r = tmp) != null) break;
		}
		return r;
	}
	,enterDeclarationContext: function() {
		this.declarationContext = true;
	}
	,exitDeclarationContext: function() {
		this.declarationContext = false;
	}
	,declareType: function(specifier) {
		var value = glsl_parse_Object.USER_TYPE(specifier);
		var _this = this.scopes[this.scopes.length - 1];
		var key = specifier.name;
		if(__map_reserved[key] != null) _this.setReserved(key,value); else _this.h[key] = value;
	}
	,declareVariable: function(declarator) {
		var value = glsl_parse_Object.VARIABLE(declarator);
		var _this = this.scopes[this.scopes.length - 1];
		var key = declarator.name;
		if(__map_reserved[key] != null) _this.setReserved(key,value); else _this.h[key] = value;
	}
	,declarePrecision: function(declaration) {
		this.defaultPrecision.set(declaration.dataType,declaration.precision);
	}
	,get_scopeDepth: function() {
		return this.scopes.length - 1;
	}
	,get_localScope: function() {
		return this.scopes[this.scopes.length - 1];
	}
	,__class__: glsl_parse_ParseContext
};
var glsl_parse_Tables = function() { };
glsl_parse_Tables.__name__ = true;
var glsl_parse_Parser = function() { };
glsl_parse_Parser.__name__ = true;
glsl_parse_Parser.init = function() {
	glsl_parse_Parser.i = 0;
	glsl_parse_Parser.stack = [{ stateno : 0, major : 0, minor : null}];
	glsl_parse_Parser.errorCount = 0;
	glsl_parse_Parser.currentMinor = null;
	glsl_parse_Parser.warnings = [];
	glsl_parse_Actions.init();
};
glsl_parse_Parser.parse = function(input) {
	var tokens = glsl_lex_Tokenizer.tokenize(input);
	return glsl_parse_Parser.parseTokens(tokens);
};
glsl_parse_Parser.parseTokens = function(tokens) {
	glsl_parse_Parser.init();
	var lastToken = null;
	var _g = 0;
	while(_g < tokens.length) {
		var t = tokens[_g];
		++_g;
		if(HxOverrides.indexOf(glsl_parse_Parser.ignoredTokens,t.type,0) != -1) continue;
		t = glsl_parse_Actions.processToken(t);
		glsl_parse_Parser.parseStep(glsl_parse_Parser.tokenIdMap.get(t.type),t);
		lastToken = t;
	}
	glsl_parse_Parser.parseStep(0,lastToken);
	return glsl_parse_Parser.currentMinor;
};
glsl_parse_Parser.parseStep = function(major,minor) {
	var act;
	var atEOF = major == 0;
	while(true) {
		act = glsl_parse_Parser.findShiftAction(major);
		if(act < 353) {
			glsl_parse_Parser.assert(!atEOF,{ fileName : "Parser.hx", lineNumber : 80, className : "glsl.parse.Parser", methodName : "parseStep"});
			glsl_parse_Parser.shift(act,major,minor);
			glsl_parse_Parser.errorCount--;
			major = 174;
		} else if(act < 575) glsl_parse_Parser.reduce(act - 353); else {
			glsl_parse_Parser.assert(act == 575,{ fileName : "Parser.hx", lineNumber : 89, className : "glsl.parse.Parser", methodName : "parseStep"});
			if(glsl_parse_Parser.errorCount <= 0) {
				var minor1 = minor;
				var msg = "syntax error";
				var data = Reflect.field(minor1,"data");
				if(data != null) msg += ", '" + data + "'";
				glsl_parse_Parser.warn(msg,minor1);
			}
			glsl_parse_Parser.errorCount = 3;
			if(atEOF) {
				var minor2 = minor;
				var msg1 = "parse failed";
				var data1 = Reflect.field(minor2,"data");
				if(data1 != null) msg1 += ", '" + data1 + "'";
				glsl_parse_Parser.error(msg1,minor2);
			}
			major = 174;
		}
		if(!(major != 174 && glsl_parse_Parser.i >= 0)) break;
	}
};
glsl_parse_Parser.popStack = function() {
	if(glsl_parse_Parser.i < 0) return 0;
	var major = glsl_parse_Parser.stack.pop().major;
	glsl_parse_Parser.i--;
	return major;
};
glsl_parse_Parser.findShiftAction = function(iLookAhead) {
	var stateno = glsl_parse_Parser.stack[glsl_parse_Parser.i].stateno;
	var j = glsl_parse_Parser.shiftOffset[stateno];
	if(stateno > 182 || j == -57) return glsl_parse_Parser.defaultAction[stateno];
	glsl_parse_Parser.assert(iLookAhead != 174,{ fileName : "Parser.hx", lineNumber : 126, className : "glsl.parse.Parser", methodName : "findShiftAction"});
	j += iLookAhead;
	if(j < 0 || j >= glsl_parse_Parser.actionCount || glsl_parse_Parser.lookahead[j] != iLookAhead) return glsl_parse_Parser.defaultAction[stateno];
	return glsl_parse_Parser.action[j];
};
glsl_parse_Parser.findReduceAction = function(stateno,iLookAhead) {
	var j;
	glsl_parse_Parser.assert(stateno <= 82,{ fileName : "Parser.hx", lineNumber : 145, className : "glsl.parse.Parser", methodName : "findReduceAction"});
	j = glsl_parse_Parser.reduceOffset[stateno];
	glsl_parse_Parser.assert(j != -63,{ fileName : "Parser.hx", lineNumber : 150, className : "glsl.parse.Parser", methodName : "findReduceAction"});
	glsl_parse_Parser.assert(iLookAhead != 174,{ fileName : "Parser.hx", lineNumber : 151, className : "glsl.parse.Parser", methodName : "findReduceAction"});
	j += iLookAhead;
	glsl_parse_Parser.assert(j >= 0 && j < glsl_parse_Parser.actionCount,{ fileName : "Parser.hx", lineNumber : 159, className : "glsl.parse.Parser", methodName : "findReduceAction"});
	glsl_parse_Parser.assert(glsl_parse_Parser.lookahead[j] == iLookAhead,{ fileName : "Parser.hx", lineNumber : 160, className : "glsl.parse.Parser", methodName : "findReduceAction"});
	return glsl_parse_Parser.action[j];
};
glsl_parse_Parser.shift = function(newState,major,minor) {
	glsl_parse_Parser.i++;
	glsl_parse_Parser.stack[glsl_parse_Parser.i] = { stateno : newState, major : major, minor : minor};
};
glsl_parse_Parser.reduce = function(ruleno) {
	var $goto;
	var act;
	var size;
	var newNode = glsl_parse_Actions.reduce(ruleno);
	glsl_parse_Parser.currentMinor = newNode;
	$goto = glsl_parse__$Parser_RuleInfoEntry_$Impl_$.get_lhs(glsl_parse_Parser.ruleInfo[ruleno]);
	size = glsl_parse__$Parser_RuleInfoEntry_$Impl_$.get_nrhs(glsl_parse_Parser.ruleInfo[ruleno]);
	glsl_parse_Parser.i -= size;
	act = glsl_parse_Parser.findReduceAction(glsl_parse_Parser.stack[glsl_parse_Parser.i].stateno,$goto);
	if(act < 353) glsl_parse_Parser.shift(act,$goto,newNode); else {
		glsl_parse_Parser.assert(act == 576,{ fileName : "Parser.hx", lineNumber : 193, className : "glsl.parse.Parser", methodName : "reduce"});
		glsl_parse_Parser.accept();
	}
};
glsl_parse_Parser.accept = function() {
	while(glsl_parse_Parser.i >= 0) glsl_parse_Parser.popStack();
};
glsl_parse_Parser.syntaxError = function(major,minor) {
	var msg = "syntax error";
	var data = Reflect.field(minor,"data");
	if(data != null) msg += ", '" + data + "'";
	glsl_parse_Parser.warn(msg,minor);
};
glsl_parse_Parser.parseFailed = function(minor) {
	var msg = "parse failed";
	var data = Reflect.field(minor,"data");
	if(data != null) msg += ", '" + data + "'";
	glsl_parse_Parser.error(msg,minor);
};
glsl_parse_Parser.assert = function(cond,pos) {
	if(!cond) glsl_parse_Parser.warn("assert failed in " + pos.className + "::" + pos.methodName + " line " + pos.lineNumber);
};
glsl_parse_Parser.warn = function(msg,info) {
	var str = "Parser Warning: " + msg;
	var line = Reflect.field(info,"line");
	var col = Reflect.field(info,"column");
	var tmp;
	var a = Type["typeof"](line);
	tmp = Type.enumEq(a,ValueType.TInt);
	if(tmp) {
		str += ", line " + line;
		var tmp1;
		var a1 = Type["typeof"](col);
		tmp1 = Type.enumEq(a1,ValueType.TInt);
		if(tmp1) str += ", column " + col;
	}
	glsl_parse_Parser.warnings.push(str);
};
glsl_parse_Parser.error = function(msg,info) {
	var str = "Parser Error: " + msg;
	var line = Reflect.field(info,"line");
	var col = Reflect.field(info,"column");
	var tmp;
	var a = Type["typeof"](line);
	tmp = Type.enumEq(a,ValueType.TInt);
	if(tmp) {
		str += ", line " + line;
		var tmp1;
		var a1 = Type["typeof"](col);
		tmp1 = Type.enumEq(a1,ValueType.TInt);
		if(tmp1) str += ", column " + col;
	}
	throw new js__$Boot_HaxeError(str);
};
var glsl_parse__$Parser_RuleInfoEntry_$Impl_$ = {};
glsl_parse__$Parser_RuleInfoEntry_$Impl_$.__name__ = true;
glsl_parse__$Parser_RuleInfoEntry_$Impl_$.get_lhs = function(this1) {
	return this1[0];
};
glsl_parse__$Parser_RuleInfoEntry_$Impl_$.set_lhs = function(this1,v) {
	return this1[0] = v;
};
glsl_parse__$Parser_RuleInfoEntry_$Impl_$.get_nrhs = function(this1) {
	return this1[1];
};
glsl_parse__$Parser_RuleInfoEntry_$Impl_$.set_nrhs = function(this1,v) {
	return this1[1] = v;
};
var glsl_preprocess_Preprocessor = function(userDefinedMacros,builtinMacros) {
	this.preserveMacroDefinitions = false;
	var _g1 = this;
	this.i = 0;
	this.userDefinedMacros = userDefinedMacros != null?userDefinedMacros:new haxe_ds_StringMap();
	var tmp;
	if(builtinMacros != null) tmp = builtinMacros; else {
		var _g = new haxe_ds_StringMap();
		var value = glsl_preprocess_PPMacro.UnresolveableMacro(glsl_preprocess_PPMacro.BuiltinMacroObject(function() {
			return _g1._version == null?"null":"" + _g1._version;
		}));
		if(__map_reserved.__VERSION__ != null) _g.setReserved("__VERSION__",value); else _g.h["__VERSION__"] = value;
		var value1 = glsl_preprocess_PPMacro.UnresolveableMacro(glsl_preprocess_PPMacro.BuiltinMacroObject(function() {
			return Std.string(_g1.tokens[_g1.i].line);
		}));
		if(__map_reserved.__LINE__ != null) _g.setReserved("__LINE__",value1); else _g.h["__LINE__"] = value1;
		var value2 = glsl_preprocess_PPMacro.UnresolveableMacro(glsl_preprocess_PPMacro.BuiltinMacroObject(function() {
			return "0";
		}));
		if(__map_reserved.__FILE__ != null) _g.setReserved("__FILE__",value2); else _g.h["__FILE__"] = value2;
		var value3 = glsl_preprocess_PPMacro.UnresolveableMacro(glsl_preprocess_PPMacro.BuiltinMacroObject(function() {
			return "1";
		}));
		if(__map_reserved.GL_ES != null) _g.setReserved("GL_ES",value3); else _g.h["GL_ES"] = value3;
		tmp = _g;
	}
	this.builtinMacros = tmp;
	this._warnings = [];
	this._version = 100;
	this._pragmas = [];
};
glsl_preprocess_Preprocessor.__name__ = true;
glsl_preprocess_Preprocessor.process = function(inputTokens,forceResolve) {
	if(forceResolve == null) forceResolve = false;
	var pp = new glsl_preprocess_Preprocessor();
	var tokens = pp._process(inputTokens,forceResolve);
	glsl_preprocess_Preprocessor.warnings = pp._warnings;
	glsl_preprocess_Preprocessor.version = pp._version;
	glsl_preprocess_Preprocessor.pragmas = pp._pragmas;
	return tokens;
};
glsl_preprocess_Preprocessor.prototype = {
	_process: function(inputTokens,forceResolve) {
		if(forceResolve == null) forceResolve = false;
		var _g = this;
		this.tokens = inputTokens;
		this.forceResolve = forceResolve;
		while(this.i < this.tokens.length) {
			var _g1 = this.tokens[this.i].type;
			switch(_g1[1]) {
			case 94:
				try {
					this.processDirective();
				} catch( $e0 ) {
					if ($e0 instanceof js__$Boot_HaxeError) $e0 = $e0.val;
					if( js_Boot.__instanceof($e0,glsl_preprocess_PPError) ) {
						var e = $e0;
						switch(e[1]) {
						case 0:
							var info = e[3];
							_g.note(e[2],info != null?info:_g.tokens[_g.i]);
							break;
						case 1:
							var info1 = e[3];
							_g.warn(e[2],info1 != null?info1:_g.tokens[_g.i]);
							break;
						case 2:
							var info2 = e[3];
							_g.error(e[2],info2 != null?info2:_g.tokens[_g.i]);
							break;
						}
					} else if( js_Boot.__instanceof($e0,String) ) {
						var msg = $e0;
						_g.warn(msg,_g.tokens[_g.i]);
					} else throw($e0);
				}
				break;
			default:
				{
					var _g11 = HxOverrides.indexOf(glsl_lex_TokenHelper.identifierTokenTypes,_g1,0) >= 0;
					switch(_g11) {
					case true:
						try {
							this.processIdentifier();
						} catch( $e1 ) {
							if ($e1 instanceof js__$Boot_HaxeError) $e1 = $e1.val;
							if( js_Boot.__instanceof($e1,glsl_preprocess_PPError) ) {
								var e1 = $e1;
								switch(e1[1]) {
								case 0:
									var info3 = e1[3];
									_g.note(e1[2],info3 != null?info3:_g.tokens[_g.i]);
									break;
								case 1:
									var info4 = e1[3];
									_g.warn(e1[2],info4 != null?info4:_g.tokens[_g.i]);
									break;
								case 2:
									var info5 = e1[3];
									_g.error(e1[2],info5 != null?info5:_g.tokens[_g.i]);
									break;
								}
							} else if( js_Boot.__instanceof($e1,String) ) {
								var msg1 = $e1;
								_g.warn(msg1,_g.tokens[_g.i]);
							} else throw($e1);
						}
						break;
					default:
					}
				}
			}
			this.i++;
		}
		return this.tokens;
	}
	,processDirective: function() {
		var t = this.tokens[this.i];
		var directive = this.readDirectiveData(t.data);
		var _g = directive.title;
		switch(_g) {
		case "":
			glsl_lex_TokenHelper.deleteTokens(this.tokens,this.i);
			break;
		case "define":
			var definition = this.evaluateMacroDefinition(directive.content);
			this.defineMacro(definition.id,definition.ppMacro);
			if(!this.preserveMacroDefinitions) glsl_lex_TokenHelper.deleteTokens(this.tokens,this.i);
			break;
		case "undef":
			var tmp;
			if(!glsl_preprocess_Preprocessor.macroNameReg.match(directive.content)) throw new js__$Boot_HaxeError("invalid macro name");
			tmp = glsl_preprocess_Preprocessor.macroNameReg.matched(1);
			var macroName = tmp;
			this.undefineMacro(macroName);
			if(!this.preserveMacroDefinitions) glsl_lex_TokenHelper.deleteTokens(this.tokens,this.i);
			break;
		case "if":case "ifdef":case "ifndef":
			this.processIfSwitch();
			break;
		case "else":case "elif":case "endif":
			throw new js__$Boot_HaxeError("unexpected #" + directive.title);
			break;
		case "error":
			throw new js__$Boot_HaxeError(glsl_preprocess_PPError.Error("" + directive.content,t));
			break;
		case "pragma":
			if(new EReg("^\\s*STDGL(\\s+|$)","").match(directive.content)) throw new js__$Boot_HaxeError("pragmas beginning with STDGL are reserved");
			this._pragmas.push(directive.content);
			break;
		case "extension":
			throw new js__$Boot_HaxeError("directive #extension is not yet supported");
			break;
		case "version":
			if(glsl_lex_TokenHelper.nextNonSkipToken(this.tokens,this.i,-1) == null) {
				var versionNumRegex = new EReg("^(\\d+)$","");
				var matched = versionNumRegex.match(directive.content);
				if(matched) {
					versionNumRegex.matched(1);
					this._version = Std.parseInt(versionNumRegex.matched(1));
				} else {
					var _g1 = directive.content;
					switch(_g1) {
					case "":
						throw new js__$Boot_HaxeError("version number required");
						break;
					default:
						throw new js__$Boot_HaxeError("invalid version number '" + directive.content + "'");
					}
				}
			} else throw new js__$Boot_HaxeError("#version directive must occur before anything else, except for comments and whitespace");
			break;
		case "line":
			throw new js__$Boot_HaxeError("directive #line is not yet supported");
			break;
		default:
			throw new js__$Boot_HaxeError("unknown directive #'" + directive.title + "'");
		}
	}
	,processIfSwitch: function() {
		var _g1 = this;
		var start = this.i;
		var end = null;
		var j = this.i;
		var t;
		var level = 0;
		var directive;
		var lastTitle;
		var branches = [];
		try {
			t = this.tokens[j];
			try {
				{
					var _g = directive = this.readDirectiveData(t.data);
					var directive1 = _g;
					switch(_g.title) {
					case "if":
						var content = _g.content;
						level++;
						branches.push({ directiveToken : t, test : function() {
							throw new js__$Boot_HaxeError(glsl_preprocess_PPError.Note("#if directive is not yet supported",t));
						}, start : j + 1, end : null});
						break;
					case "ifdef":
						var content1 = _g.content;
						level++;
						var tmp;
						if(!glsl_preprocess_Preprocessor.macroNameReg.match(content1)) throw new js__$Boot_HaxeError("invalid macro name");
						tmp = glsl_preprocess_Preprocessor.macroNameReg.matched(1);
						var macroName = tmp;
						branches.push({ directiveToken : t, test : function() {
							return _g1.isMacroDefined(macroName);
						}, start : j + 1, end : null});
						break;
					case "ifndef":
						var content2 = _g.content;
						level++;
						var tmp1;
						if(!glsl_preprocess_Preprocessor.macroNameReg.match(content2)) throw new js__$Boot_HaxeError("invalid macro name");
						tmp1 = glsl_preprocess_Preprocessor.macroNameReg.matched(1);
						var macroName1 = tmp1;
						branches.push({ directiveToken : t, test : function() {
							return !_g1.isMacroDefined(macroName1);
						}, start : j + 1, end : null});
						break;
					default:
						throw new js__$Boot_HaxeError("expected if-switch directive, got #" + directive1.title);
					}
				}
				lastTitle = directive.title;
				while(level > 0) {
					j = glsl_lex_TokenHelper.nextNonSkipTokenIndex(this.tokens,j,1,glsl_lex_TokenType.PREPROCESSOR_DIRECTIVE);
					t = this.tokens[j];
					if(t == null) throw new js__$Boot_HaxeError("expecting #endif but reached end of file");
					{
						var _g2 = directive = this.readDirectiveData(t.data);
						switch(_g2.title) {
						case "if":case "ifdef":case "ifndef":
							level++;
							break;
						case "else":
							if(level == 1) {
								if(lastTitle == "else") throw new js__$Boot_HaxeError("#" + directive.title + " cannot follow #else");
								branches[branches.length - 1].end = j - 1;
								branches.push({ directiveToken : t, test : function() {
									return true;
								}, start : j + 1, end : null});
							}
							break;
						case "elif":
							var content3 = _g2.content;
							if(level == 1) {
								if(lastTitle == "else") throw new js__$Boot_HaxeError("#" + directive.title + " cannot follow #else");
								branches[branches.length - 1].end = j - 1;
								branches.push({ directiveToken : t, test : function() {
									throw new js__$Boot_HaxeError(glsl_preprocess_PPError.Note("#elif directive is not yet supported",t));
								}, start : j + 1, end : null});
							}
							break;
						case "endif":
							level--;
							break;
						default:
						}
					}
					lastTitle = directive.title;
				}
				branches[branches.length - 1].end = j - 1;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				throw new js__$Boot_HaxeError(this.replaceErrorInfo(e,t));
			}
			end = j;
			var newTokens = [];
			var _g3 = 0;
			while(_g3 < branches.length) {
				var b = branches[_g3];
				++_g3;
				try {
					if(b.test()) {
						newTokens = this.tokens.slice(b.start,b.end);
						break;
					}
				} catch( e1 ) {
					if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
					var userMacrosBefore = [new haxe_ds_StringMap()];
					var $it0 = this.userDefinedMacros.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						var tmp2;
						var _this = this.userDefinedMacros;
						if(__map_reserved[k] != null) tmp2 = _this.getReserved(k); else tmp2 = _this.h[k];
						var value = tmp2;
						if(__map_reserved[k] != null) userMacrosBefore[0].setReserved(k,value); else userMacrosBefore[0].h[k] = value;
					}
					var requiredMacros = [new haxe_ds_StringMap()];
					var tokensDelta = 0;
					var _g21 = 0;
					var _g11 = branches.length;
					while(_g21 < _g11) {
						var bi = _g21++;
						var c = branches[branches.length - 1 - bi];
						{
							var _g31 = this.readDirectiveData(c.directiveToken.data);
							if(_g31 == null) {
							} else switch(_g31.title) {
							case "if":
								var content4 = _g31.content;
								var directiveTokens = glsl_lex_Tokenizer.tokenize(content4);
								var _g4 = 0;
								while(_g4 < directiveTokens.length) {
									var dt = directiveTokens[_g4];
									++_g4;
									if(HxOverrides.indexOf(glsl_lex_TokenHelper.identifierTokenTypes,dt.type,0) >= 0 && dt.data != "defined") {
										var ppMacro = this.getMacro(dt.data);
										if(ppMacro != null) {
											var key = dt.data;
											if(__map_reserved[key] != null) requiredMacros[0].setReserved(key,ppMacro); else requiredMacros[0].h[key] = ppMacro;
										}
									}
								}
								break;
							case "elif":
								var content5 = _g31.content;
								var directiveTokens1 = glsl_lex_Tokenizer.tokenize(content5);
								var _g41 = 0;
								while(_g41 < directiveTokens1.length) {
									var dt1 = directiveTokens1[_g41];
									++_g41;
									if(HxOverrides.indexOf(glsl_lex_TokenHelper.identifierTokenTypes,dt1.type,0) >= 0 && dt1.data != "defined") {
										var ppMacro1 = this.getMacro(dt1.data);
										if(ppMacro1 != null) {
											var key1 = dt1.data;
											if(__map_reserved[key1] != null) requiredMacros[0].setReserved(key1,ppMacro1); else requiredMacros[0].h[key1] = ppMacro1;
										}
									}
								}
								break;
							default:
							}
						}
						var branchTokens = this.tokens.slice(c.start,c.end);
						var childUserMacros = new haxe_ds_StringMap();
						var $it1 = this.userDefinedMacros.keys();
						while( $it1.hasNext() ) {
							var k1 = $it1.next();
							var tmp3;
							var _this1 = this.userDefinedMacros;
							if(__map_reserved[k1] != null) tmp3 = _this1.getReserved(k1); else tmp3 = _this1.h[k1];
							var value1 = tmp3;
							if(__map_reserved[k1] != null) childUserMacros.setReserved(k1,value1); else childUserMacros.h[k1] = value1;
						}
						var pp = new glsl_preprocess_Preprocessor(childUserMacros,this.builtinMacros);
						pp.preserveMacroDefinitions = true;
						pp.onMacroDefined = (function() {
							return function(id,ppMacro2) {
								var value2 = glsl_preprocess_PPMacro.UnresolveableMacro(ppMacro2);
								var _this2 = _g1.userDefinedMacros;
								if(__map_reserved[id] != null) _this2.setReserved(id,value2); else _this2.h[id] = value2;
							};
						})();
						pp.onMacroUndefined = (function(requiredMacros,userMacrosBefore) {
							return function(id1) {
								var existingMacro = __map_reserved[id1] != null?userMacrosBefore[0].getReserved(id1):userMacrosBefore[0].h[id1];
								if(existingMacro == null) return;
								var value3 = glsl_preprocess_PPMacro.UnresolveableMacro(existingMacro);
								var _this3 = _g1.userDefinedMacros;
								if(__map_reserved[id1] != null) _this3.setReserved(id1,value3); else _this3.h[id1] = value3;
								if(__map_reserved[id1] != null) requiredMacros[0].setReserved(id1,existingMacro); else requiredMacros[0].h[id1] = existingMacro;
							};
						})(requiredMacros,userMacrosBefore);
						try {
							var lenBefore = branchTokens.length;
							var newTokens1 = pp._process(branchTokens,this.forceResolve);
							tokensDelta += newTokens1.length - lenBefore;
							glsl_lex_TokenHelper.deleteTokens(this.tokens,c.start,c.end - c.start);
							glsl_lex_TokenHelper.insertTokens(this.tokens,c.start,newTokens1);
						} catch( e2 ) {
							if (e2 instanceof js__$Boot_HaxeError) e2 = e2.val;
						}
					}
					var prependTokens = [];
					var $it2 = requiredMacros[0].keys();
					while( $it2.hasNext() ) {
						var id2 = $it2.next();
						var requiredMacro = __map_reserved[id2] != null?requiredMacros[0].getReserved(id2):requiredMacros[0].h[id2];
						var undefineStr = "#undef " + id2;
						var tmp4;
						switch(requiredMacro[1]) {
						case 0:
							var content6 = requiredMacro[2];
							tmp4 = "#define " + id2 + " " + content6;
							break;
						case 1:
							var params = requiredMacro[3];
							var content7 = requiredMacro[2];
							tmp4 = "#define " + id2 + "(" + params.join(", ") + ") " + content7;
							break;
						default:
							continue;
						}
						var defineStr = tmp4;
						var glsl1 = undefineStr + "\n" + defineStr + "\n";
						prependTokens = prependTokens.concat(glsl_lex_Tokenizer.tokenize(glsl1));
					}
					glsl_lex_TokenHelper.insertTokens(this.tokens,start,prependTokens);
					start += prependTokens.length;
					tokensDelta += prependTokens.length;
					j += tokensDelta;
					end = j;
					this.i = end;
					throw new js__$Boot_HaxeError(this.replaceErrorInfo(e1,b.directiveToken));
				}
			}
			glsl_lex_TokenHelper.deleteTokens(this.tokens,start,end - start + 1);
			glsl_lex_TokenHelper.insertTokens(this.tokens,start,newTokens);
			this.i = start - 1;
		} catch( e3 ) {
			if (e3 instanceof js__$Boot_HaxeError) e3 = e3.val;
			while(level > 0) {
				j = glsl_lex_TokenHelper.nextNonSkipTokenIndex(this.tokens,j,1,glsl_lex_TokenType.PREPROCESSOR_DIRECTIVE);
				t = this.tokens[j];
				if(t == null) throw new js__$Boot_HaxeError(glsl_preprocess_PPError.Warn("expecting #endif but reached end of file",this.tokens[start]));
				var _g5 = this.readDirectiveData(t.data).title;
				switch(_g5) {
				case "if":case "ifdef":case "ifndef":
					level++;
					break;
				case "endif":
					level--;
					break;
				}
			}
			this.i = j;
			throw new js__$Boot_HaxeError(e3);
		}
	}
	,processIdentifier: function() {
		var expanded = this.expandIdentifier(this.tokens,this.i);
		if(expanded != null) this.i += expanded.length;
	}
	,getMacro: function(id) {
		var ppMacro;
		var tmp;
		var _this = this.builtinMacros;
		if(__map_reserved[id] != null) tmp = _this.getReserved(id); else tmp = _this.h[id];
		if((ppMacro = tmp) != null) return ppMacro;
		var tmp1;
		var _this1 = this.userDefinedMacros;
		if(__map_reserved[id] != null) tmp1 = _this1.getReserved(id); else tmp1 = _this1.h[id];
		if((ppMacro = tmp1) != null) return ppMacro;
		return null;
	}
	,defineMacro: function(id,ppMacro) {
		var existingMacro = this.getMacro(id);
		var __ex0 = existingMacro;
		{
			var _g = this.isBuiltinMacro(__ex0);
			switch(_g) {
			case true:
				throw new js__$Boot_HaxeError("cannot redefine predefined macro '" + id + "'");
				break;
			default:
				var __ex01 = existingMacro;
				{
					var _g1 = this.isUserMacro(__ex01);
					switch(_g1) {
					case true:
						throw new js__$Boot_HaxeError("cannot redefine macro '" + id + "'");
						break;
					default:
						if(existingMacro == null) {
						} else switch(existingMacro[1]) {
						default:
						}
					}
				}
			}
		}
		if(new EReg("^__","").match(id)) throw new js__$Boot_HaxeError("macro names beginning with __ are reserved");
		if(ppMacro == null) throw new js__$Boot_HaxeError("null macro definitions are not allowed");
		var _this = this.userDefinedMacros;
		if(__map_reserved[id] != null) _this.setReserved(id,ppMacro); else _this.h[id] = ppMacro;
		if(this.onMacroDefined != null) this.onMacroDefined(id,ppMacro);
	}
	,undefineMacro: function(id) {
		var existingMacro = this.getMacro(id);
		{
			var _g = this.isBuiltinMacro(existingMacro);
			switch(_g) {
			case true:
				throw new js__$Boot_HaxeError("cannot undefine predefined macro");
				break;
			default:
				{
					var _g1 = this.isUserMacro(existingMacro);
					switch(_g1) {
					case true:
						this.userDefinedMacros.remove(id);
						if(this.onMacroUndefined != null) this.onMacroUndefined(id);
						break;
					default:
					}
				}
			}
		}
	}
	,isMacroDefined: function(id) {
		var m = this.getMacro(id);
		if(m == null) return false; else switch(m[1]) {
		case 4:
			if(this.forceResolve && m[2] != null) return true; else throw new js__$Boot_HaxeError(glsl_preprocess_PPError.Note("cannot resolve macro definition '" + id + "'",null));
			break;
		default:
			return true;
		}
	}
	,isUserMacro: function(ppMacro) {
		if(ppMacro == null) return false; else switch(ppMacro[1]) {
		case 0:case 1:
			return true;
		case 4:
			return this.isUserMacro(ppMacro[2]);
		default:
			return false;
		}
	}
	,isBuiltinMacro: function(ppMacro) {
		if(ppMacro == null) return false; else switch(ppMacro[1]) {
		case 2:case 3:
			return true;
		case 4:
			return this.isBuiltinMacro(ppMacro[2]);
		default:
			return false;
		}
	}
	,readDirectiveData: function(data) {
		if(!glsl_preprocess_Preprocessor.directiveTitleReg.match(data)) throw new js__$Boot_HaxeError("invalid directive title");
		var title = glsl_preprocess_Preprocessor.directiveTitleReg.matched(1);
		var content = StringTools.trim(glsl_preprocess_Preprocessor.directiveTitleReg.matchedRight());
		content = StringTools.replace(content,"\\\n","\n");
		return { title : title, content : content};
	}
	,readMacroName: function(data) {
		if(!glsl_preprocess_Preprocessor.macroNameReg.match(data)) throw new js__$Boot_HaxeError("invalid macro name");
		return glsl_preprocess_Preprocessor.macroNameReg.matched(1);
	}
	,evaluateMacroDefinition: function(definitionString) {
		if(glsl_preprocess_Preprocessor.macroNameReg.match(definitionString)) {
			var macroName = glsl_preprocess_Preprocessor.macroNameReg.matched(1);
			var macroContent = "";
			var macroParameters = [];
			var nextChar = glsl_preprocess_Preprocessor.macroNameReg.matched(2);
			var userMacro;
			switch(nextChar) {
			case "(":
				var parametersReg = new EReg("([^\\)]*)\\)","");
				var parameterReg = new EReg("^\\s*(([a-z_]\\w*)?)\\s*(,|$)","i");
				var matchedRightParen = parametersReg.match(glsl_preprocess_Preprocessor.macroNameReg.matchedRight());
				if(matchedRightParen) {
					var parameterString = parametersReg.matched(1);
					macroContent = parametersReg.matchedRight();
					var reachedLast = false;
					while(!reachedLast) if(parameterReg.match(parameterString)) {
						var parameterName = parameterReg.matched(1);
						var parameterNextChar = parameterReg.matched(3);
						macroParameters.push(parameterName);
						parameterString = parameterReg.matchedRight();
						reachedLast = parameterNextChar != ",";
					} else throw new js__$Boot_HaxeError("invalid macro parameter");
				} else throw new js__$Boot_HaxeError("unmatched parentheses");
				userMacro = glsl_preprocess_PPMacro.UserMacroFunction(StringTools.trim(macroContent),macroParameters);
				break;
			default:
				macroContent = nextChar + glsl_preprocess_Preprocessor.macroNameReg.matchedRight();
				macroContent = StringTools.trim(macroContent);
				userMacro = glsl_preprocess_PPMacro.UserMacroObject(StringTools.trim(macroContent));
			}
			return { id : macroName, ppMacro : userMacro};
		} else throw new js__$Boot_HaxeError("invalid macro definition");
		return null;
	}
	,expandIdentifiers: function(tokens,overrideMap,ignore) {
		var len = tokens.length;
		var _g = 0;
		while(_g < len) {
			var j = _g++;
			if(HxOverrides.indexOf(glsl_lex_TokenHelper.identifierTokenTypes,tokens[j].type,0) >= 0) {
				this.expandIdentifier(tokens,j,overrideMap,ignore);
				len = tokens.length;
			}
		}
		return tokens;
	}
	,expandIdentifier: function(tokens,i,overrideMap,ignore) {
		var _g = this;
		var token = tokens[i];
		var id = token.data;
		if(ignore != null && HxOverrides.indexOf(ignore,id,0) != -1) return null;
		var ppMacro = overrideMap == null?this.getMacro(id):__map_reserved[id] != null?overrideMap.getReserved(id):overrideMap.h[id];
		if(ppMacro == null) return null;
		var tmp;
		var resolveMacro1 = null;
		resolveMacro1 = function(ppMacro1) {
			switch(ppMacro1[1]) {
			case 0:
				var content = ppMacro1[2];
				var tmp1;
				var newTokens1 = glsl_lex_Tokenizer.tokenize(content,function(warning) {
					throw new js__$Boot_HaxeError("" + warning);
				},function(error) {
					throw new js__$Boot_HaxeError("" + error);
				});
				var _g1 = 0;
				while(_g1 < newTokens1.length) {
					var t = newTokens1[_g1];
					++_g1;
					t.line = token.line;
					t.column = token.column;
				}
				tmp1 = newTokens1;
				var newTokens = tmp1;
				if(ignore == null) ignore = [id]; else ignore.push(id);
				_g.expandIdentifiers(newTokens,overrideMap,ignore);
				glsl_lex_TokenHelper.deleteTokens(tokens,i,1);
				glsl_lex_TokenHelper.insertTokens(tokens,i,newTokens);
				return newTokens;
			case 1:
				var parameters = ppMacro1[3];
				var content1 = ppMacro1[2];
				try {
					var functionCall = _g.readFunctionCall(tokens,i);
					if(functionCall.args.length != parameters.length) {
						var _g11 = functionCall.args.length > parameters.length;
						switch(_g11) {
						case true:
							throw new js__$Boot_HaxeError("too many arguments for macro");
							break;
						case false:
							throw new js__$Boot_HaxeError("not enough arguments for macro");
							break;
						}
					}
					var tmp2;
					var newTokens3 = glsl_lex_Tokenizer.tokenize(content1,function(warning1) {
						throw new js__$Boot_HaxeError("" + warning1);
					},function(error1) {
						throw new js__$Boot_HaxeError("" + error1);
					});
					var _g2 = 0;
					while(_g2 < newTokens3.length) {
						var t1 = newTokens3[_g2];
						++_g2;
						t1.line = token.line;
						t1.column = token.column;
					}
					tmp2 = newTokens3;
					var newTokens2 = tmp2;
					var parameterMap = new haxe_ds_StringMap();
					var _g21 = 0;
					var _g12 = parameters.length;
					while(_g21 < _g12) {
						var i1 = _g21++;
						var tmp3;
						var key = parameters[i1];
						if(__map_reserved[key] != null) tmp3 = parameterMap.existsReserved(key); else tmp3 = parameterMap.h.hasOwnProperty(key);
						if(!tmp3) {
							var value = glsl_preprocess_PPMacro.UserMacroObject(glsl_print_TokenArrayPrinter.print(functionCall.args[i1]));
							var key1 = parameters[i1];
							if(__map_reserved[key1] != null) parameterMap.setReserved(key1,value); else parameterMap.h[key1] = value;
						}
					}
					_g.expandIdentifiers(newTokens2,parameterMap);
					if(ignore == null) ignore = [id]; else ignore.push(id);
					_g.expandIdentifiers(newTokens2,overrideMap,ignore);
					glsl_lex_TokenHelper.deleteTokens(tokens,i,functionCall.len);
					glsl_lex_TokenHelper.insertTokens(tokens,i,newTokens2);
					return newTokens2;
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
				}
				break;
			case 2:
				var func = ppMacro1[2];
				var tmp4;
				var content2 = func();
				var newTokens5 = glsl_lex_Tokenizer.tokenize(content2,function(warning2) {
					throw new js__$Boot_HaxeError("" + warning2);
				},function(error2) {
					throw new js__$Boot_HaxeError("" + error2);
				});
				var _g3 = 0;
				while(_g3 < newTokens5.length) {
					var t2 = newTokens5[_g3];
					++_g3;
					t2.line = token.line;
					t2.column = token.column;
				}
				tmp4 = newTokens5;
				var newTokens4 = tmp4;
				glsl_lex_TokenHelper.deleteTokens(tokens,i,1);
				glsl_lex_TokenHelper.insertTokens(tokens,i,newTokens4);
				return newTokens4;
			case 3:
				var requiredParameterCount = ppMacro1[3];
				var func1 = ppMacro1[2];
				try {
					var functionCall1 = _g.readFunctionCall(tokens,i);
					if(functionCall1.args.length != requiredParameterCount) {
						var _g13 = functionCall1.args.length > requiredParameterCount;
						switch(_g13) {
						case true:
							throw new js__$Boot_HaxeError("too many arguments for macro");
							break;
						case false:
							throw new js__$Boot_HaxeError("not enough arguments for macro");
							break;
						}
					}
					var tmp5;
					var content3 = func1(functionCall1.args);
					var newTokens7 = glsl_lex_Tokenizer.tokenize(content3,function(warning3) {
						throw new js__$Boot_HaxeError("" + warning3);
					},function(error3) {
						throw new js__$Boot_HaxeError("" + error3);
					});
					var _g4 = 0;
					while(_g4 < newTokens7.length) {
						var t3 = newTokens7[_g4];
						++_g4;
						t3.line = token.line;
						t3.column = token.column;
					}
					tmp5 = newTokens7;
					var newTokens6 = tmp5;
					glsl_lex_TokenHelper.deleteTokens(tokens,i,functionCall1.len);
					glsl_lex_TokenHelper.insertTokens(tokens,i,newTokens6);
					return newTokens6;
				} catch( e1 ) {
					if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				}
				break;
			case 4:
				var fm = ppMacro1[2];
				if(_g.forceResolve && fm != null) return resolveMacro1(fm); else throw new js__$Boot_HaxeError(glsl_preprocess_PPError.Note("cannot resolve macro '" + id + "'",token));
				break;
			}
			return null;
		};
		tmp = resolveMacro1;
		var resolveMacro = tmp;
		return resolveMacro(ppMacro);
	}
	,readFunctionCall: function(tokens,start) {
		var ident = tokens[start];
		if(ident == null || !(HxOverrides.indexOf(glsl_lex_TokenHelper.identifierTokenTypes,ident.type,0) >= 0)) throw new js__$Boot_HaxeError("invalid function call");
		var args = [];
		var j = glsl_lex_TokenHelper.nextNonSkipTokenIndex(tokens,start);
		if(j == -1) throw new js__$Boot_HaxeError("invalid function call");
		var t = tokens[j];
		if(Type.enumEq(t.type,glsl_lex_TokenType.LEFT_PAREN)) {
			var argBuffer = [];
			var level = 1;
			do {
				t = tokens[++j];
				if(t == null) throw new js__$Boot_HaxeError("expecting ')'");
				if(HxOverrides.indexOf(glsl_lex_Tokenizer.skippableTypes,t.type,0) != -1) continue;
				var _g = t.type;
				if(_g == null) throw new js__$Boot_HaxeError("" + Std.string(t) + " has no token type"); else switch(_g[1]) {
				case 65:
					level++;
					break;
				case 66:
					level--;
					break;
				case 72:
					if(level == 1) {
						args.push(argBuffer);
						argBuffer = [];
					} else argBuffer.push(t);
					break;
				default:
					argBuffer.push(t);
				}
				if(level <= 0) {
					args.push(argBuffer);
					argBuffer = [];
					break;
				}
			} while(true);
			return { ident : ident, args : args, start : start, len : j - start + 1};
		}
		throw new js__$Boot_HaxeError("expecting '('");
	}
	,evaluateExpr: function(expr) {
	}
	,note: function(msg,info) {
		console.log("Preprocessor Note: " + msg + this.positionString(info));
	}
	,warn: function(msg,info) {
		this._warnings.push("Preprocessor Warning: " + msg + this.positionString(info));
	}
	,error: function(msg,info) {
		throw new js__$Boot_HaxeError("Preprocessor Error: " + msg + this.positionString(info));
	}
	,positionString: function(info) {
		var str = "";
		var line = Reflect.field(info,"line");
		var col = Reflect.field(info,"column");
		var tmp;
		var a = Type["typeof"](line);
		tmp = Type.enumEq(a,ValueType.TInt);
		if(tmp) {
			str += ", line " + line;
			var tmp1;
			var a1 = Type["typeof"](col);
			tmp1 = Type.enumEq(a1,ValueType.TInt);
			if(tmp1) str += ", column " + col;
		}
		return str;
	}
	,replaceErrorInfo: function(error,newInfo) {
		var tmp;
		var _g = Type["typeof"](error);
		if(_g == null) tmp = glsl_preprocess_PPError.Warn(error,newInfo); else switch(_g[1]) {
		case 7:
			switch(_g[2]) {
			case glsl_preprocess_PPError:
				var tmp1;
				var e = error;
				tmp1 = e[1];
				switch(tmp1) {
				case 0:
					tmp = glsl_preprocess_PPError.Note(error[2],newInfo);
					break;
				case 1:
					tmp = glsl_preprocess_PPError.Warn(error[2],newInfo);
					break;
				case 2:
					tmp = glsl_preprocess_PPError.Error(error[2],newInfo);
					break;
				}
				break;
			default:
				tmp = glsl_preprocess_PPError.Warn(error,newInfo);
			}
			break;
		default:
			tmp = glsl_preprocess_PPError.Warn(error,newInfo);
		}
		return tmp;
	}
	,__class__: glsl_preprocess_Preprocessor
};
var glsl_preprocess_PPMacro = { __ename__ : true, __constructs__ : ["UserMacroObject","UserMacroFunction","BuiltinMacroObject","BuiltinMacroFunction","UnresolveableMacro"] };
glsl_preprocess_PPMacro.UserMacroObject = function(content) { var $x = ["UserMacroObject",0,content]; $x.__enum__ = glsl_preprocess_PPMacro; $x.toString = $estr; return $x; };
glsl_preprocess_PPMacro.UserMacroFunction = function(content,parameters) { var $x = ["UserMacroFunction",1,content,parameters]; $x.__enum__ = glsl_preprocess_PPMacro; $x.toString = $estr; return $x; };
glsl_preprocess_PPMacro.BuiltinMacroObject = function(func) { var $x = ["BuiltinMacroObject",2,func]; $x.__enum__ = glsl_preprocess_PPMacro; $x.toString = $estr; return $x; };
glsl_preprocess_PPMacro.BuiltinMacroFunction = function(func,parameterCount) { var $x = ["BuiltinMacroFunction",3,func,parameterCount]; $x.__enum__ = glsl_preprocess_PPMacro; $x.toString = $estr; return $x; };
glsl_preprocess_PPMacro.UnresolveableMacro = function(ppMacro) { var $x = ["UnresolveableMacro",4,ppMacro]; $x.__enum__ = glsl_preprocess_PPMacro; $x.toString = $estr; return $x; };
var glsl_preprocess_PPError = { __ename__ : true, __constructs__ : ["Note","Warn","Error"] };
glsl_preprocess_PPError.Note = function(msg,info) { var $x = ["Note",0,msg,info]; $x.__enum__ = glsl_preprocess_PPError; $x.toString = $estr; return $x; };
glsl_preprocess_PPError.Warn = function(msg,info) { var $x = ["Warn",1,msg,info]; $x.__enum__ = glsl_preprocess_PPError; $x.toString = $estr; return $x; };
glsl_preprocess_PPError.Error = function(msg,info) { var $x = ["Error",2,msg,info]; $x.__enum__ = glsl_preprocess_PPError; $x.toString = $estr; return $x; };
var glsl_print_SyntaxPrinter = function() { };
glsl_print_SyntaxPrinter.__name__ = true;
glsl_print_SyntaxPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	return glsl_print_NodePrinter.print(n,indentWith,indentLevel);
};
var glsl_print_NodePrinter = function() { };
glsl_print_NodePrinter.__name__ = true;
glsl_print_NodePrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var tmp;
	var _g = glsl_NodeTypeHelper.safeNodeType(n);
	if(_g == null) throw new js__$Boot_HaxeError("Node cannot be printed: " + Std.string(n)); else switch(_g[1]) {
	case 0:
		tmp = glsl_print_RootPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 1:
		tmp = glsl_print_TypeSpecifierPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 2:
		tmp = glsl_print_StructSpecifierPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 3:
		tmp = glsl_print_StructFieldDeclarationPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 4:
		tmp = glsl_print_StructDeclaratorPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 5:
		tmp = glsl_print_ExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 6:
		tmp = glsl_print_IdentifierPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 7:
		tmp = glsl_print_PrimitivePrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 8:
		tmp = glsl_print_BinaryExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 9:
		tmp = glsl_print_UnaryExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 10:
		tmp = glsl_print_SequenceExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 11:
		tmp = glsl_print_ConditionalExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 12:
		tmp = glsl_print_AssignmentExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 13:
		tmp = glsl_print_FieldSelectionExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 14:
		tmp = glsl_print_ArrayElementSelectionExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 15:
		tmp = glsl_print_FunctionCallPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 16:
		tmp = glsl_print_ConstructorPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 17:
		tmp = glsl_print_DeclarationPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 18:
		tmp = glsl_print_PrecisionDeclarationPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 19:
		tmp = glsl_print_VariableDeclarationPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 20:
		tmp = glsl_print_DeclaratorPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 21:
		tmp = glsl_print_ParameterDeclarationPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 22:
		tmp = glsl_print_FunctionDefinitionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 23:
		tmp = glsl_print_FunctionPrototypePrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 24:
		tmp = glsl_print_FunctionHeaderPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 25:
		tmp = glsl_print_StatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 26:
		tmp = glsl_print_CompoundStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 27:
		tmp = glsl_print_DeclarationStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 28:
		tmp = glsl_print_ExpressionStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 29:
		tmp = glsl_print_IterationStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 30:
		tmp = glsl_print_WhileStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 31:
		tmp = glsl_print_DoWhileStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 32:
		tmp = glsl_print_ForStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 33:
		tmp = glsl_print_IfStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 34:
		tmp = glsl_print_JumpStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 35:
		tmp = glsl_print_ReturnStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	default:
		throw new js__$Boot_HaxeError("Node cannot be printed: " + Std.string(n));
	}
	return tmp;
};
var glsl_print_RootPrinter = function() { };
glsl_print_RootPrinter.__name__ = true;
glsl_print_RootPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = "";
	var _g1 = 0;
	var _g = n.declarations.length;
	while(_g1 < _g) {
		var i = _g1++;
		var d = n.declarations[i];
		var unit = glsl_print_DeclarationPrinter.print(d,indentWith,0);
		var currentNodeEnum = glsl_NodeTypeHelper.safeNodeType(d);
		var nextNodeEnum = glsl_NodeTypeHelper.safeNodeType(n.declarations[i + 1]);
		if(pretty) {
			if(nextNodeEnum != null) {
				unit = unit + "\n";
				var tmp;
				if(!(currentNodeEnum[1] != nextNodeEnum[1])) switch(currentNodeEnum[1]) {
				case 22:
					tmp = true;
					break;
				default:
					tmp = false;
				} else tmp = true;
				if(tmp) unit = unit + "\n";
			}
		} else {
			var tmp1;
			switch(currentNodeEnum[1]) {
			case 36:
				tmp1 = true;
				break;
			default:
				tmp1 = false;
			}
			if(tmp1) unit = unit + "\n"; else {
				var tmp2;
				if(nextNodeEnum != null) switch(nextNodeEnum[1]) {
				case 36:
					tmp2 = true;
					break;
				default:
					tmp2 = false;
				} else tmp2 = false;
				if(tmp2) unit = unit + "\n";
			}
		}
		str += unit;
	}
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_TypeSpecifierPrinter = function() { };
glsl_print_TypeSpecifierPrinter.__name__ = true;
glsl_print_TypeSpecifierPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	{
		var _g = glsl_NodeTypeHelper.safeNodeType(n);
		switch(_g[1]) {
		case 2:
			return glsl_print_StructSpecifierPrinter.print(_g[2],indentWith,indentLevel);
		default:
		}
	}
	var str = "";
	var qualifiers = [];
	if(n.invariant) qualifiers.push("invariant");
	if(n.storage != null) qualifiers.push(glsl_print_StorageQualifierPrinter.print(n.storage));
	if(n.precision != null) qualifiers.push(glsl_print_PrecisionQualifierPrinter.print(n.precision));
	if(n.dataType != null) qualifiers.push(glsl_print_DataTypePrinter.print(n.dataType));
	str += qualifiers.join(" ");
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_StructSpecifierPrinter = function() { };
glsl_print_StructSpecifierPrinter.__name__ = true;
glsl_print_StructSpecifierPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = "";
	var qualifiers = [];
	if(n.invariant) qualifiers.push("invariant");
	if(n.storage != null) qualifiers.push(glsl_print_StorageQualifierPrinter.print(n.storage));
	if(n.precision != null) qualifiers.push(glsl_print_PrecisionQualifierPrinter.print(n.precision));
	str += qualifiers.join(" ") + (qualifiers.length > 0?" ":"");
	var name = n.name != null?n.name:"";
	str += "struct " + name + "{" + (pretty?"\n":"");
	str += n.fieldDeclarations.map(function(fd) {
		return glsl_print_StructFieldDeclarationPrinter.print(fd,indentWith,1);
	}).join(pretty?"\n":"");
	str += (pretty?"\n":"") + "}";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_StructFieldDeclarationPrinter = function() { };
glsl_print_StructFieldDeclarationPrinter.__name__ = true;
glsl_print_StructFieldDeclarationPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = glsl_print_TypeSpecifierPrinter.print(n.typeSpecifier,indentWith,0) + " ";
	str += n.declarators.map(function(dr) {
		return glsl_print_StructDeclaratorPrinter.print(dr,indentWith);
	}).join(pretty?", ":",");
	str += ";";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_StructDeclaratorPrinter = function() { };
glsl_print_StructDeclaratorPrinter.__name__ = true;
glsl_print_StructDeclaratorPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = n.name + (n.arraySizeExpression != null?"[" + glsl_print_ExpressionPrinter.print(n.arraySizeExpression,indentWith,0) + "]":"");
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_ExpressionPrinter = function() { };
glsl_print_ExpressionPrinter.__name__ = true;
glsl_print_ExpressionPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var tmp;
	var _g = glsl_NodeTypeHelper.safeNodeType(n);
	if(_g == null) throw new js__$Boot_HaxeError("Expression cannot be printed: " + Std.string(n)); else switch(_g[1]) {
	case 6:
		tmp = glsl_print_IdentifierPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 7:
		tmp = glsl_print_PrimitivePrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 8:
		tmp = glsl_print_BinaryExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 9:
		tmp = glsl_print_UnaryExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 10:
		tmp = glsl_print_SequenceExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 11:
		tmp = glsl_print_ConditionalExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 12:
		tmp = glsl_print_AssignmentExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 13:
		tmp = glsl_print_FieldSelectionExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 14:
		tmp = glsl_print_ArrayElementSelectionExpressionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 15:
		tmp = glsl_print_FunctionCallPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 16:
		tmp = glsl_print_ConstructorPrinter.print(_g[2],indentWith,indentLevel);
		break;
	default:
		throw new js__$Boot_HaxeError("Expression cannot be printed: " + Std.string(n));
	}
	return tmp;
};
var glsl_print_IdentifierPrinter = function() { };
glsl_print_IdentifierPrinter.__name__ = true;
glsl_print_IdentifierPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = n.name;
	if(n.enclosed) str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_PrimitivePrinter = function() { };
glsl_print_PrimitivePrinter.__name__ = true;
glsl_print_PrimitivePrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = n.raw;
	if(n.enclosed) str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_BinaryExpressionPrinter = function() { };
glsl_print_BinaryExpressionPrinter.__name__ = true;
glsl_print_BinaryExpressionPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = "";
	str += glsl_print_ExpressionPrinter.print(n.left,indentWith);
	str += pretty?" " + glsl_print_BinaryOperatorPrinter.print(n.op) + " ":glsl_print_BinaryOperatorPrinter.print(n.op);
	str += glsl_print_ExpressionPrinter.print(n.right,indentWith);
	if(n.enclosed) str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_UnaryExpressionPrinter = function() { };
glsl_print_UnaryExpressionPrinter.__name__ = true;
glsl_print_UnaryExpressionPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = "";
	if(n.isPrefix) str += glsl_print_UnaryOperatorPrinter.print(n.op) + glsl_print_ExpressionPrinter.print(n.arg,indentWith); else str += glsl_print_ExpressionPrinter.print(n.arg,indentWith) + glsl_print_UnaryOperatorPrinter.print(n.op);
	if(n.enclosed) str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_SequenceExpressionPrinter = function() { };
glsl_print_SequenceExpressionPrinter.__name__ = true;
glsl_print_SequenceExpressionPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = n.expressions.map(function(e) {
		return glsl_print_ExpressionPrinter.print(e,indentWith);
	}).join(pretty?", ":",");
	str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_ConditionalExpressionPrinter = function() { };
glsl_print_ConditionalExpressionPrinter.__name__ = true;
glsl_print_ConditionalExpressionPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = glsl_print_ExpressionPrinter.print(n.test,indentWith) + (pretty?" ? ":"?") + glsl_print_ExpressionPrinter.print(n.consequent,indentWith) + (pretty?" : ":":") + glsl_print_ExpressionPrinter.print(n.alternate,indentWith);
	if(n.enclosed) str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_AssignmentExpressionPrinter = function() { };
glsl_print_AssignmentExpressionPrinter.__name__ = true;
glsl_print_AssignmentExpressionPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = "";
	str += glsl_print_ExpressionPrinter.print(n.left,indentWith);
	str += pretty?" " + glsl_print_AssignmentOperatorPrinter.print(n.op) + " ":glsl_print_AssignmentOperatorPrinter.print(n.op);
	str += glsl_print_ExpressionPrinter.print(n.right,indentWith);
	if(n.enclosed) str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_FieldSelectionExpressionPrinter = function() { };
glsl_print_FieldSelectionExpressionPrinter.__name__ = true;
glsl_print_FieldSelectionExpressionPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = glsl_print_ExpressionPrinter.print(n.left,indentWith) + "." + glsl_print_IdentifierPrinter.print(n.field,indentWith);
	if(n.enclosed) str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_ArrayElementSelectionExpressionPrinter = function() { };
glsl_print_ArrayElementSelectionExpressionPrinter.__name__ = true;
glsl_print_ArrayElementSelectionExpressionPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = glsl_print_ExpressionPrinter.print(n.left,indentWith) + "[" + glsl_print_ExpressionPrinter.print(n.arrayIndexExpression,indentWith) + "]";
	if(n.enclosed) str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_FunctionCallPrinter = function() { };
glsl_print_FunctionCallPrinter.__name__ = true;
glsl_print_FunctionCallPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	{
		var _g = glsl_NodeTypeHelper.safeNodeType(n);
		switch(_g[1]) {
		case 16:
			return glsl_print_ConstructorPrinter.print(_g[2],indentWith,indentLevel);
		default:
		}
	}
	var pretty = indentWith != null;
	var str = n.name + "(";
	str += n.parameters.map(function(e) {
		return glsl_print_ExpressionPrinter.print(e,indentWith);
	}).join(pretty?", ":",");
	str += ")";
	if(n.enclosed) str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_ConstructorPrinter = function() { };
glsl_print_ConstructorPrinter.__name__ = true;
glsl_print_ConstructorPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = glsl_print_DataTypePrinter.print(n.dataType) + "(";
	str += n.parameters.map(function(e) {
		return glsl_print_ExpressionPrinter.print(e,indentWith);
	}).join(pretty?", ":",");
	str += ")";
	if(n.enclosed) str = "(" + str + ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_DeclarationPrinter = function() { };
glsl_print_DeclarationPrinter.__name__ = true;
glsl_print_DeclarationPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var tmp;
	var _g = glsl_NodeTypeHelper.safeNodeType(n);
	if(_g == null) throw new js__$Boot_HaxeError("Declaration cannot be printed: " + Std.string(n)); else switch(_g[1]) {
	case 18:
		tmp = glsl_print_PrecisionDeclarationPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 19:
		tmp = glsl_print_VariableDeclarationPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 23:
		tmp = glsl_print_FunctionPrototypePrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 22:
		tmp = glsl_print_FunctionDefinitionPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 36:
		tmp = glsl_print_PreprocessorDirectivePrinter.print(_g[2],indentWith,indentLevel);
		break;
	default:
		throw new js__$Boot_HaxeError("Declaration cannot be printed: " + Std.string(n));
	}
	return tmp;
};
var glsl_print_PrecisionDeclarationPrinter = function() { };
glsl_print_PrecisionDeclarationPrinter.__name__ = true;
glsl_print_PrecisionDeclarationPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = "precision " + glsl_print_PrecisionQualifierPrinter.print(n.precision) + " " + glsl_print_DataTypePrinter.print(n.dataType) + ";";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_VariableDeclarationPrinter = function() { };
glsl_print_VariableDeclarationPrinter.__name__ = true;
glsl_print_VariableDeclarationPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = glsl_print_TypeSpecifierPrinter.print(n.typeSpecifier,indentWith,0) + (n.declarators.length > 0?" ":"");
	str += n.declarators.map(function(dr) {
		return glsl_print_DeclaratorPrinter.print(dr,indentWith);
	}).join(pretty?", ":",");
	str += ";";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_DeclaratorPrinter = function() { };
glsl_print_DeclaratorPrinter.__name__ = true;
glsl_print_DeclaratorPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = "";
	str += (n.name != null?n.name:"") + (n.arraySizeExpression != null?"[" + glsl_print_ExpressionPrinter.print(n.arraySizeExpression,indentWith,0) + "]":"") + (n.initializer != null?(pretty?" = ":"=") + glsl_print_ExpressionPrinter.print(n.initializer,indentWith,0):"");
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_ParameterDeclarationPrinter = function() { };
glsl_print_ParameterDeclarationPrinter.__name__ = true;
glsl_print_ParameterDeclarationPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var parts = [];
	if(n.parameterQualifier != null) parts.push(glsl_print_ParameterQualifierPrinter.print(n.parameterQualifier));
	if(n.typeSpecifier != null) parts.push(glsl_print_TypeSpecifierPrinter.print(n.typeSpecifier,indentWith));
	if(n.name != null) parts.push(n.name);
	if(n.arraySizeExpression != null) parts.push("[" + glsl_print_ExpressionPrinter.print(n.arraySizeExpression,indentWith) + "]");
	var str = parts.join(" ");
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_FunctionDefinitionPrinter = function() { };
glsl_print_FunctionDefinitionPrinter.__name__ = true;
glsl_print_FunctionDefinitionPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = glsl_print_FunctionHeaderPrinter.print(n.header,indentWith);
	str += glsl_print_CompoundStatementPrinter.print(n.body,indentWith);
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_FunctionPrototypePrinter = function() { };
glsl_print_FunctionPrototypePrinter.__name__ = true;
glsl_print_FunctionPrototypePrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = glsl_print_FunctionHeaderPrinter.print(n.header,indentWith) + ";";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_FunctionHeaderPrinter = function() { };
glsl_print_FunctionHeaderPrinter.__name__ = true;
glsl_print_FunctionHeaderPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = glsl_print_TypeSpecifierPrinter.print(n.returnType,indentWith) + " " + n.name + "(";
	str += n.parameters.map(function(p) {
		return glsl_print_ParameterDeclarationPrinter.print(p,indentWith);
	}).join(pretty?", ":",");
	str += ")";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_StatementPrinter = function() { };
glsl_print_StatementPrinter.__name__ = true;
glsl_print_StatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var tmp;
	var _g = glsl_NodeTypeHelper.safeNodeType(n);
	if(_g == null) throw new js__$Boot_HaxeError("Statement cannot be printed: " + Std.string(n)); else switch(_g[1]) {
	case 26:
		tmp = glsl_print_CompoundStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 27:
		tmp = glsl_print_DeclarationStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 28:
		tmp = glsl_print_ExpressionStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 29:
		tmp = glsl_print_IterationStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 30:
		tmp = glsl_print_WhileStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 31:
		tmp = glsl_print_DoWhileStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 32:
		tmp = glsl_print_ForStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 33:
		tmp = glsl_print_IfStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 34:
		tmp = glsl_print_JumpStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 35:
		tmp = glsl_print_ReturnStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 36:
		tmp = glsl_print_PreprocessorDirectivePrinter.print(_g[2],indentWith,indentLevel);
		break;
	default:
		throw new js__$Boot_HaxeError("Statement cannot be printed: " + Std.string(n));
	}
	return tmp;
};
var glsl_print_CompoundStatementPrinter = function() { };
glsl_print_CompoundStatementPrinter.__name__ = true;
glsl_print_CompoundStatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = "";
	str += "{" + (pretty?"\n":"");
	var _g1 = 0;
	var _g = n.statementList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var smt = n.statementList[i];
		var smtStr = glsl_print_StatementPrinter.print(smt,indentWith,1);
		var currentNodeEnum = glsl_NodeTypeHelper.safeNodeType(smt);
		var nextNodeEnum = glsl_NodeTypeHelper.safeNodeType(n.statementList[i + 1]);
		if(pretty) {
			if(nextNodeEnum != null) {
				smtStr = smtStr + "\n";
				if(currentNodeEnum[1] != nextNodeEnum[1] || js_Boot.__instanceof(smt,glsl_IterationStatement)) smtStr = smtStr + "\n";
			}
		} else {
			var previousNodeEnum = glsl_NodeTypeHelper.safeNodeType(n.statementList[i - 1]);
			var tmp;
			switch(currentNodeEnum[1]) {
			case 36:
				tmp = true;
				break;
			default:
				tmp = false;
			}
			if(tmp) {
				smtStr = smtStr + "\n";
				if(previousNodeEnum == null) smtStr = "\n" + smtStr;
			} else {
				var tmp1;
				if(nextNodeEnum != null) switch(nextNodeEnum[1]) {
				case 36:
					tmp1 = true;
					break;
				default:
					tmp1 = false;
				} else tmp1 = false;
				if(tmp1) smtStr = smtStr + "\n";
			}
		}
		str += smtStr;
	}
	str += (pretty?"\n":"") + "}";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_DeclarationStatementPrinter = function() { };
glsl_print_DeclarationStatementPrinter.__name__ = true;
glsl_print_DeclarationStatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = glsl_print_DeclarationPrinter.print(n.declaration,indentWith);
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_ExpressionStatementPrinter = function() { };
glsl_print_ExpressionStatementPrinter.__name__ = true;
glsl_print_ExpressionStatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = n.expression != null?glsl_print_ExpressionPrinter.print(n.expression,indentWith):"";
	str += ";";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_IfStatementPrinter = function() { };
glsl_print_IfStatementPrinter.__name__ = true;
glsl_print_IfStatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var tmp;
	var _g = glsl_NodeTypeHelper.safeNodeType(n.consequent);
	switch(_g[1]) {
	case 26:
		tmp = true;
		break;
	default:
		tmp = false;
	}
	var compoundConsequent = tmp;
	var str = "if(" + glsl_print_ExpressionPrinter.print(n.test,indentWith) + ")";
	str += pretty && !compoundConsequent?" ":"";
	str += glsl_print_StatementPrinter.print(n.consequent,indentWith);
	if(n.alternate != null) {
		str += pretty && !compoundConsequent?"\n":"";
		var tmp1;
		var _g1 = glsl_NodeTypeHelper.safeNodeType(n.alternate);
		switch(_g1[1]) {
		case 26:
			tmp1 = true;
			break;
		default:
			tmp1 = false;
		}
		var compoundAlternate = tmp1;
		str += "else";
		str += !compoundAlternate?" ":"";
		str += glsl_print_StatementPrinter.print(n.alternate,indentWith);
	}
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_JumpStatementPrinter = function() { };
glsl_print_JumpStatementPrinter.__name__ = true;
glsl_print_JumpStatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	{
		var _g = glsl_NodeTypeHelper.safeNodeType(n);
		switch(_g[1]) {
		case 35:
			glsl_print_ReturnStatementPrinter.print(_g[2],indentWith,indentLevel);
			break;
		default:
		}
	}
	var str = glsl_print_JumpModePrinter.print(n.mode);
	str += ";";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_ReturnStatementPrinter = function() { };
glsl_print_ReturnStatementPrinter.__name__ = true;
glsl_print_ReturnStatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = glsl_print_JumpModePrinter.print(n.mode);
	if(n.returnExpression != null) str += " " + glsl_print_ExpressionPrinter.print(n.returnExpression,indentWith);
	str += ";";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_IterationStatementPrinter = function() { };
glsl_print_IterationStatementPrinter.__name__ = true;
glsl_print_IterationStatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var tmp;
	var _g = glsl_NodeTypeHelper.safeNodeType(n);
	if(_g == null) throw new js__$Boot_HaxeError("IterationStatement cannot be printed: " + Std.string(n)); else switch(_g[1]) {
	case 30:
		tmp = glsl_print_WhileStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 31:
		tmp = glsl_print_DoWhileStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	case 32:
		tmp = glsl_print_ForStatementPrinter.print(_g[2],indentWith,indentLevel);
		break;
	default:
		throw new js__$Boot_HaxeError("IterationStatement cannot be printed: " + Std.string(n));
	}
	return tmp;
};
var glsl_print_WhileStatementPrinter = function() { };
glsl_print_WhileStatementPrinter.__name__ = true;
glsl_print_WhileStatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = "while(" + glsl_print_ExpressionPrinter.print(n.test,indentWith) + ")";
	str += glsl_print_StatementPrinter.print(n.body,indentWith);
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_DoWhileStatementPrinter = function() { };
glsl_print_DoWhileStatementPrinter.__name__ = true;
glsl_print_DoWhileStatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var tmp;
	var _g = glsl_NodeTypeHelper.safeNodeType(n.body);
	switch(_g[1]) {
	case 26:
		tmp = true;
		break;
	default:
		tmp = false;
	}
	var compoundBody = tmp;
	var str = "do";
	str += !compoundBody?" ":"";
	str += glsl_print_StatementPrinter.print(n.body,indentWith);
	str += !compoundBody && pretty?"\n":"";
	str += "while(" + glsl_print_ExpressionPrinter.print(n.test,indentWith) + ")";
	str += ";";
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_ForStatementPrinter = function() { };
glsl_print_ForStatementPrinter.__name__ = true;
glsl_print_ForStatementPrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var pretty = indentWith != null;
	var str = "for";
	str += "(" + (n.init != null?glsl_print_StatementPrinter.print(n.init,indentWith):"") + (pretty?" ":"") + (n.test != null?glsl_print_ExpressionPrinter.print(n.test,indentWith):"") + (pretty?"; ":";") + (n.update != null?glsl_print_ExpressionPrinter.print(n.update,indentWith):"") + ")";
	str += glsl_print_StatementPrinter.print(n.body,indentWith);
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_PreprocessorDirectivePrinter = function() { };
glsl_print_PreprocessorDirectivePrinter.__name__ = true;
glsl_print_PreprocessorDirectivePrinter.print = function(n,indentWith,indentLevel) {
	if(indentLevel == null) indentLevel = 0;
	var str = n.content;
	return glsl_print_Utils.indent(str,indentWith,indentLevel);
};
var glsl_print_BinaryOperatorPrinter = function() { };
glsl_print_BinaryOperatorPrinter.__name__ = true;
glsl_print_BinaryOperatorPrinter.print = function(e) {
	var tmp;
	if(e == null) tmp = ""; else switch(e[1]) {
	case 5:
		tmp = "<<";
		break;
	case 6:
		tmp = ">>";
		break;
	case 9:
		tmp = "<=";
		break;
	case 10:
		tmp = ">=";
		break;
	case 11:
		tmp = "==";
		break;
	case 12:
		tmp = "!=";
		break;
	case 16:
		tmp = "&&";
		break;
	case 18:
		tmp = "||";
		break;
	case 17:
		tmp = "^^";
		break;
	case 4:
		tmp = "-";
		break;
	case 3:
		tmp = "+";
		break;
	case 0:
		tmp = "*";
		break;
	case 1:
		tmp = "/";
		break;
	case 2:
		tmp = "%";
		break;
	case 7:
		tmp = "<";
		break;
	case 8:
		tmp = ">";
		break;
	case 15:
		tmp = "|";
		break;
	case 14:
		tmp = "^";
		break;
	case 13:
		tmp = "&";
		break;
	}
	return tmp;
};
var glsl_print_UnaryOperatorPrinter = function() { };
glsl_print_UnaryOperatorPrinter.__name__ = true;
glsl_print_UnaryOperatorPrinter.print = function(e) {
	var tmp;
	if(e == null) tmp = ""; else switch(e[1]) {
	case 0:
		tmp = "++";
		break;
	case 1:
		tmp = "--";
		break;
	case 4:
		tmp = "!";
		break;
	case 3:
		tmp = "-";
		break;
	case 5:
		tmp = "~";
		break;
	case 2:
		tmp = "+";
		break;
	}
	return tmp;
};
var glsl_print_AssignmentOperatorPrinter = function() { };
glsl_print_AssignmentOperatorPrinter.__name__ = true;
glsl_print_AssignmentOperatorPrinter.print = function(e) {
	var tmp;
	if(e == null) tmp = ""; else switch(e[1]) {
	case 1:
		tmp = "*=";
		break;
	case 2:
		tmp = "/=";
		break;
	case 4:
		tmp = "+=";
		break;
	case 3:
		tmp = "%=";
		break;
	case 5:
		tmp = "-=";
		break;
	case 6:
		tmp = "<<=";
		break;
	case 7:
		tmp = ">>=";
		break;
	case 8:
		tmp = "&=";
		break;
	case 9:
		tmp = "^=";
		break;
	case 10:
		tmp = "|=";
		break;
	case 0:
		tmp = "=";
		break;
	}
	return tmp;
};
var glsl_print_PrecisionQualifierPrinter = function() { };
glsl_print_PrecisionQualifierPrinter.__name__ = true;
glsl_print_PrecisionQualifierPrinter.print = function(e) {
	var tmp;
	if(e == null) tmp = ""; else switch(e[1]) {
	case 0:
		tmp = "highp";
		break;
	case 1:
		tmp = "mediump";
		break;
	case 2:
		tmp = "lowp";
		break;
	}
	return tmp;
};
var glsl_print_JumpModePrinter = function() { };
glsl_print_JumpModePrinter.__name__ = true;
glsl_print_JumpModePrinter.print = function(e) {
	var tmp;
	if(e == null) tmp = ""; else switch(e[1]) {
	case 1:
		tmp = "break";
		break;
	case 0:
		tmp = "continue";
		break;
	case 2:
		tmp = "return";
		break;
	case 3:
		tmp = "discard";
		break;
	}
	return tmp;
};
var glsl_print_DataTypePrinter = function() { };
glsl_print_DataTypePrinter.__name__ = true;
glsl_print_DataTypePrinter.print = function(e) {
	var tmp;
	if(e == null) tmp = ""; else switch(e[1]) {
	case 0:
		tmp = "void";
		break;
	case 2:
		tmp = "int";
		break;
	case 1:
		tmp = "float";
		break;
	case 3:
		tmp = "bool";
		break;
	case 4:
		tmp = "vec2";
		break;
	case 5:
		tmp = "vec3";
		break;
	case 6:
		tmp = "vec4";
		break;
	case 7:
		tmp = "bvec2";
		break;
	case 8:
		tmp = "bvec3";
		break;
	case 9:
		tmp = "bvec4";
		break;
	case 10:
		tmp = "ivec2";
		break;
	case 11:
		tmp = "ivec3";
		break;
	case 12:
		tmp = "ivec4";
		break;
	case 13:
		tmp = "mat2";
		break;
	case 14:
		tmp = "mat3";
		break;
	case 15:
		tmp = "mat4";
		break;
	case 16:
		tmp = "sampler2D";
		break;
	case 17:
		tmp = "samplerCube";
		break;
	case 18:
		tmp = e[2];
		break;
	}
	return tmp;
};
var glsl_print_ParameterQualifierPrinter = function() { };
glsl_print_ParameterQualifierPrinter.__name__ = true;
glsl_print_ParameterQualifierPrinter.print = function(e) {
	var tmp;
	if(e == null) tmp = ""; else switch(e[1]) {
	case 0:
		tmp = "in";
		break;
	case 1:
		tmp = "out";
		break;
	case 2:
		tmp = "inout";
		break;
	}
	return tmp;
};
var glsl_print_StorageQualifierPrinter = function() { };
glsl_print_StorageQualifierPrinter.__name__ = true;
glsl_print_StorageQualifierPrinter.print = function(e) {
	var tmp;
	if(e == null) tmp = ""; else switch(e[1]) {
	case 1:
		tmp = "attribute";
		break;
	case 3:
		tmp = "uniform";
		break;
	case 2:
		tmp = "varying";
		break;
	case 0:
		tmp = "const";
		break;
	}
	return tmp;
};
var glsl_print_TokenPrinter = function() { };
glsl_print_TokenPrinter.__name__ = true;
glsl_print_TokenPrinter.print = function(token) {
	return token.data;
};
var glsl_print_TokenArrayPrinter = function() { };
glsl_print_TokenArrayPrinter.__name__ = true;
glsl_print_TokenArrayPrinter.print = function(tokens) {
	var str = "";
	var _g = 0;
	while(_g < tokens.length) {
		var t = tokens[_g];
		++_g;
		str += glsl_print_TokenPrinter.print(t);
	}
	return str;
};
var glsl_print_Utils = function() { };
glsl_print_Utils.__name__ = true;
glsl_print_Utils.indent = function(str,chars,level) {
	if(level == null) level = 1;
	if(chars == null || level == 0) return str;
	var result = "";
	var tmp;
	var _g = [];
	var _g1 = 0;
	while(_g1 < level) {
		_g1++;
		_g.push(chars);
	}
	tmp = _g;
	var identStr = tmp.join("");
	var lines = str.split("\n");
	var _g2 = 0;
	var _g11 = lines.length;
	while(_g2 < _g11) {
		var i = _g2++;
		var line = lines[i];
		result += identStr + line + (i < lines.length - 1?"\n":"");
	}
	return result;
};
glsl_print_Utils.intString = function(i) {
	var str = i == null?"null":"" + i;
	var rx = new EReg("(\\d+)\\.","g");
	if(rx.match(str)) str = rx.matched(1);
	return str == ""?"0":str;
};
glsl_print_Utils.floatString = function(f) {
	var str = f == null?"null":"" + f;
	var rx = new EReg("\\.","g");
	if(!rx.match(str)) str += ".0";
	return str;
};
glsl_print_Utils.boolString = function(b) {
	return b == null?"null":"" + b;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_BalancedTree = function() {
};
haxe_ds_BalancedTree.__name__ = true;
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		var tmp;
		if(c == 0) tmp = new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			tmp = this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			tmp = this.balance(node.left,node.key,node.value,nr);
		}
		return tmp;
	}
	,balance: function(l,k,v,r) {
		var hl = l == null?0:l._height;
		var hr = r == null?0:r._height;
		var tmp;
		if(hl > hr + 2) {
			var tmp1;
			var _this = l.left;
			if(_this == null) tmp1 = 0; else tmp1 = _this._height;
			var tmp2;
			var _this1 = l.right;
			if(_this1 == null) tmp2 = 0; else tmp2 = _this1._height;
			if(tmp1 >= tmp2) tmp = new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else tmp = new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			var tmp3;
			var _this2 = r.right;
			if(_this2 == null) tmp3 = 0; else tmp3 = _this2._height;
			var tmp4;
			var _this3 = r.left;
			if(_this3 == null) tmp4 = 0; else tmp4 = _this3._height;
			if(tmp3 > tmp4) tmp = new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else tmp = new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else tmp = new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
		return tmp;
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) {
		var tmp;
		var _this = this.left;
		if(_this == null) tmp = 0; else tmp = _this._height;
		var tmp1;
		var _this1 = this.right;
		if(_this1 == null) tmp1 = 0; else tmp1 = _this1._height;
		var tmp2;
		if(tmp > tmp1) {
			var _this2 = this.left;
			if(_this2 == null) tmp2 = 0; else tmp2 = _this2._height;
		} else {
			var _this3 = this.right;
			if(_this3 == null) tmp2 = 0; else tmp2 = _this3._height;
		}
		this._height = tmp2 + 1;
	} else this._height = h;
};
haxe_ds_TreeNode.__name__ = true;
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
haxe_ds_EnumValueMap.__name__ = true;
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		return Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)?this.compare(v1,v2):(v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)?this.compareArgs(v1,v2):Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		return this.rh == null?null:this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var tmp;
		var _this = this.arrayKeys();
		tmp = HxOverrides.iter(_this);
		return tmp;
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
var __map_reserved = {}
glsl_lex_TokenHelper.identifierTokenTypes = [glsl_lex_TokenType.IDENTIFIER,glsl_lex_TokenType.ATTRIBUTE,glsl_lex_TokenType.UNIFORM,glsl_lex_TokenType.VARYING,glsl_lex_TokenType.CONST,glsl_lex_TokenType.VOID,glsl_lex_TokenType.INT,glsl_lex_TokenType.FLOAT,glsl_lex_TokenType.BOOL,glsl_lex_TokenType.VEC2,glsl_lex_TokenType.VEC3,glsl_lex_TokenType.VEC4,glsl_lex_TokenType.BVEC2,glsl_lex_TokenType.BVEC3,glsl_lex_TokenType.BVEC4,glsl_lex_TokenType.IVEC2,glsl_lex_TokenType.IVEC3,glsl_lex_TokenType.IVEC4,glsl_lex_TokenType.MAT2,glsl_lex_TokenType.MAT3,glsl_lex_TokenType.MAT4,glsl_lex_TokenType.SAMPLER2D,glsl_lex_TokenType.SAMPLERCUBE,glsl_lex_TokenType.BREAK,glsl_lex_TokenType.CONTINUE,glsl_lex_TokenType.WHILE,glsl_lex_TokenType.DO,glsl_lex_TokenType.FOR,glsl_lex_TokenType.IF,glsl_lex_TokenType.ELSE,glsl_lex_TokenType.RETURN,glsl_lex_TokenType.DISCARD,glsl_lex_TokenType.STRUCT,glsl_lex_TokenType.IN,glsl_lex_TokenType.OUT,glsl_lex_TokenType.INOUT,glsl_lex_TokenType.INVARIANT,glsl_lex_TokenType.PRECISION,glsl_lex_TokenType.HIGH_PRECISION,glsl_lex_TokenType.MEDIUM_PRECISION,glsl_lex_TokenType.LOW_PRECISION,glsl_lex_TokenType.BOOLCONSTANT,glsl_lex_TokenType.RESERVED_KEYWORD,glsl_lex_TokenType.TYPE_NAME,glsl_lex_TokenType.FIELD_SELECTION];
glsl_lex_TokenHelper.typeTokenTypes = [glsl_lex_TokenType.VOID,glsl_lex_TokenType.INT,glsl_lex_TokenType.FLOAT,glsl_lex_TokenType.BOOL,glsl_lex_TokenType.VEC2,glsl_lex_TokenType.VEC3,glsl_lex_TokenType.VEC4,glsl_lex_TokenType.BVEC2,glsl_lex_TokenType.BVEC3,glsl_lex_TokenType.BVEC4,glsl_lex_TokenType.IVEC2,glsl_lex_TokenType.IVEC3,glsl_lex_TokenType.IVEC4,glsl_lex_TokenType.MAT2,glsl_lex_TokenType.MAT3,glsl_lex_TokenType.MAT4,glsl_lex_TokenType.SAMPLER2D,glsl_lex_TokenType.SAMPLERCUBE,glsl_lex_TokenType.TYPE_NAME];
glsl_lex_Tokenizer.verbose = false;
glsl_lex_Tokenizer.floatMode = 0;
glsl_lex_Tokenizer.operatorRegex = new EReg("[&<=>|*?!+%(){}.~:,;/\\-\\^\\[\\]]","");
glsl_lex_Tokenizer.startConditionsMap = (function($this) {
	var $r;
	var _g = new haxe_ds_EnumValueMap();
	_g.set(glsl_lex__$Tokenizer_ScanMode.BLOCK_COMMENT,function() {
		return glsl_lex_Tokenizer.source.substring(glsl_lex_Tokenizer.i,glsl_lex_Tokenizer.i + 2) == "/*"?2:null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.LINE_COMMENT,function() {
		return glsl_lex_Tokenizer.source.substring(glsl_lex_Tokenizer.i,glsl_lex_Tokenizer.i + 2) == "//"?2:null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.PREPROCESSOR_DIRECTIVE,function() {
		if(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i) == "#") {
			var j = glsl_lex_Tokenizer.i - 1;
			while(glsl_lex_Tokenizer.source.charAt(j) != "\n" && glsl_lex_Tokenizer.source.charAt(j) != "") {
				if(!new EReg("\\s","").match(glsl_lex_Tokenizer.source.charAt(j))) return null;
				j--;
			}
			return 1;
		}
		return null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.WHITESPACE,function() {
		return new EReg("\\s","").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i))?1:null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.OPERATOR,function() {
		return glsl_lex_Tokenizer.operatorRegex.match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i))?1:null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.LITERAL,function() {
		return new EReg("[a-z_]","i").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i))?1:null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.HEX_CONSTANT,function() {
		return new EReg("0x[a-f0-9]","i").match(glsl_lex_Tokenizer.source.substring(glsl_lex_Tokenizer.i,glsl_lex_Tokenizer.i + 3))?3:null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.OCTAL_CONSTANT,function() {
		return new EReg("0[0-7]","").match(glsl_lex_Tokenizer.source.substring(glsl_lex_Tokenizer.i,glsl_lex_Tokenizer.i + 2))?2:null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.DECIMAL_CONSTANT,function() {
		return new EReg("[0-9]","").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i))?1:null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.FLOATING_CONSTANT,function() {
		if(glsl_lex_Tokenizer.startLen(glsl_lex__$Tokenizer_ScanMode.FRACTIONAL_CONSTANT) != null) return 0;
		var j1 = glsl_lex_Tokenizer.i;
		while(new EReg("[0-9]","").match(glsl_lex_Tokenizer.source.charAt(j1))) j1++;
		var _i = glsl_lex_Tokenizer.i;
		glsl_lex_Tokenizer.i = j1;
		var exponentFollows = glsl_lex_Tokenizer.startLen(glsl_lex__$Tokenizer_ScanMode.EXPONENT_PART) != null;
		glsl_lex_Tokenizer.i = _i;
		if(j1 > glsl_lex_Tokenizer.i && exponentFollows) return 0;
		return null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.FRACTIONAL_CONSTANT,function() {
		var j2 = glsl_lex_Tokenizer.i;
		while(new EReg("[0-9]","").match(glsl_lex_Tokenizer.source.charAt(j2))) j2++;
		if(j2 > glsl_lex_Tokenizer.i && glsl_lex_Tokenizer.source.charAt(j2) == ".") return ++j2 - glsl_lex_Tokenizer.i;
		return new EReg("\\.\\d","").match(glsl_lex_Tokenizer.source.substring(glsl_lex_Tokenizer.i,glsl_lex_Tokenizer.i + 2))?2:null;
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.EXPONENT_PART,function() {
		var r = new EReg("^[e][+-]?\\d","i");
		return r.match(glsl_lex_Tokenizer.source.substring(glsl_lex_Tokenizer.i,glsl_lex_Tokenizer.i + 3))?r.matched(0).length:null;
	});
	$r = _g;
	return $r;
}(this));
glsl_lex_Tokenizer.endConditionsMap = (function($this) {
	var $r;
	var _g = new haxe_ds_EnumValueMap();
	_g.set(glsl_lex__$Tokenizer_ScanMode.BLOCK_COMMENT,function() {
		return glsl_lex_Tokenizer.source.substring(glsl_lex_Tokenizer.i - 2,glsl_lex_Tokenizer.i) == "*/";
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.LINE_COMMENT,function() {
		return glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i) == "\n" || glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i) == "";
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.PREPROCESSOR_DIRECTIVE,function() {
		return glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i) == "\n" && glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i - 1) != "\\" || glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i) == "";
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.WHITESPACE,function() {
		return !new EReg("\\s","").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i));
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.OPERATOR,function() {
		var tmp;
		var key = glsl_lex_Tokenizer.buf + glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i);
		var _this = glsl_lex_Tokenizer.operatorMap;
		if(__map_reserved[key] != null) tmp = _this.existsReserved(key); else tmp = _this.h.hasOwnProperty(key);
		return !tmp || glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i) == "";
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.LITERAL,function() {
		return !new EReg("[a-z0-9_]","i").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i));
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.HEX_CONSTANT,function() {
		return !new EReg("[a-f0-9]","i").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i));
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.OCTAL_CONSTANT,function() {
		return !new EReg("[0-7]","").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i));
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.DECIMAL_CONSTANT,function() {
		return !new EReg("[0-9]","").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i));
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.FLOATING_CONSTANT,function() {
		return !new EReg("[0-9]","").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i));
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.FRACTIONAL_CONSTANT,function() {
		return !new EReg("[0-9]","").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i));
	});
	_g.set(glsl_lex__$Tokenizer_ScanMode.EXPONENT_PART,function() {
		return !new EReg("[0-9]","").match(glsl_lex_Tokenizer.source.charAt(glsl_lex_Tokenizer.i));
	});
	$r = _g;
	return $r;
}(this));
glsl_lex_Tokenizer.operatorMap = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = glsl_lex_TokenType.LEFT_OP;
		if(__map_reserved["<<"] != null) _g.setReserved("<<",value); else _g.h["<<"] = value;
	}
	{
		var value1 = glsl_lex_TokenType.RIGHT_OP;
		if(__map_reserved[">>"] != null) _g.setReserved(">>",value1); else _g.h[">>"] = value1;
	}
	{
		var value2 = glsl_lex_TokenType.INC_OP;
		if(__map_reserved["++"] != null) _g.setReserved("++",value2); else _g.h["++"] = value2;
	}
	{
		var value3 = glsl_lex_TokenType.DEC_OP;
		if(__map_reserved["--"] != null) _g.setReserved("--",value3); else _g.h["--"] = value3;
	}
	{
		var value4 = glsl_lex_TokenType.LE_OP;
		if(__map_reserved["<="] != null) _g.setReserved("<=",value4); else _g.h["<="] = value4;
	}
	{
		var value5 = glsl_lex_TokenType.GE_OP;
		if(__map_reserved[">="] != null) _g.setReserved(">=",value5); else _g.h[">="] = value5;
	}
	{
		var value6 = glsl_lex_TokenType.EQ_OP;
		if(__map_reserved["=="] != null) _g.setReserved("==",value6); else _g.h["=="] = value6;
	}
	{
		var value7 = glsl_lex_TokenType.NE_OP;
		if(__map_reserved["!="] != null) _g.setReserved("!=",value7); else _g.h["!="] = value7;
	}
	{
		var value8 = glsl_lex_TokenType.AND_OP;
		if(__map_reserved["&&"] != null) _g.setReserved("&&",value8); else _g.h["&&"] = value8;
	}
	{
		var value9 = glsl_lex_TokenType.OR_OP;
		if(__map_reserved["||"] != null) _g.setReserved("||",value9); else _g.h["||"] = value9;
	}
	{
		var value10 = glsl_lex_TokenType.XOR_OP;
		if(__map_reserved["^^"] != null) _g.setReserved("^^",value10); else _g.h["^^"] = value10;
	}
	{
		var value11 = glsl_lex_TokenType.MUL_ASSIGN;
		if(__map_reserved["*="] != null) _g.setReserved("*=",value11); else _g.h["*="] = value11;
	}
	{
		var value12 = glsl_lex_TokenType.DIV_ASSIGN;
		if(__map_reserved["/="] != null) _g.setReserved("/=",value12); else _g.h["/="] = value12;
	}
	{
		var value13 = glsl_lex_TokenType.ADD_ASSIGN;
		if(__map_reserved["+="] != null) _g.setReserved("+=",value13); else _g.h["+="] = value13;
	}
	{
		var value14 = glsl_lex_TokenType.MOD_ASSIGN;
		if(__map_reserved["%="] != null) _g.setReserved("%=",value14); else _g.h["%="] = value14;
	}
	{
		var value15 = glsl_lex_TokenType.SUB_ASSIGN;
		if(__map_reserved["-="] != null) _g.setReserved("-=",value15); else _g.h["-="] = value15;
	}
	{
		var value16 = glsl_lex_TokenType.LEFT_ASSIGN;
		if(__map_reserved["<<="] != null) _g.setReserved("<<=",value16); else _g.h["<<="] = value16;
	}
	{
		var value17 = glsl_lex_TokenType.RIGHT_ASSIGN;
		if(__map_reserved[">>="] != null) _g.setReserved(">>=",value17); else _g.h[">>="] = value17;
	}
	{
		var value18 = glsl_lex_TokenType.AND_ASSIGN;
		if(__map_reserved["&="] != null) _g.setReserved("&=",value18); else _g.h["&="] = value18;
	}
	{
		var value19 = glsl_lex_TokenType.XOR_ASSIGN;
		if(__map_reserved["^="] != null) _g.setReserved("^=",value19); else _g.h["^="] = value19;
	}
	{
		var value20 = glsl_lex_TokenType.OR_ASSIGN;
		if(__map_reserved["|="] != null) _g.setReserved("|=",value20); else _g.h["|="] = value20;
	}
	{
		var value21 = glsl_lex_TokenType.LEFT_PAREN;
		if(__map_reserved["("] != null) _g.setReserved("(",value21); else _g.h["("] = value21;
	}
	{
		var value22 = glsl_lex_TokenType.RIGHT_PAREN;
		if(__map_reserved[")"] != null) _g.setReserved(")",value22); else _g.h[")"] = value22;
	}
	{
		var value23 = glsl_lex_TokenType.LEFT_BRACKET;
		if(__map_reserved["["] != null) _g.setReserved("[",value23); else _g.h["["] = value23;
	}
	{
		var value24 = glsl_lex_TokenType.RIGHT_BRACKET;
		if(__map_reserved["]"] != null) _g.setReserved("]",value24); else _g.h["]"] = value24;
	}
	{
		var value25 = glsl_lex_TokenType.LEFT_BRACE;
		if(__map_reserved["{"] != null) _g.setReserved("{",value25); else _g.h["{"] = value25;
	}
	{
		var value26 = glsl_lex_TokenType.RIGHT_BRACE;
		if(__map_reserved["}"] != null) _g.setReserved("}",value26); else _g.h["}"] = value26;
	}
	{
		var value27 = glsl_lex_TokenType.DOT;
		if(__map_reserved["."] != null) _g.setReserved(".",value27); else _g.h["."] = value27;
	}
	{
		var value28 = glsl_lex_TokenType.COMMA;
		if(__map_reserved[","] != null) _g.setReserved(",",value28); else _g.h[","] = value28;
	}
	{
		var value29 = glsl_lex_TokenType.COLON;
		if(__map_reserved[":"] != null) _g.setReserved(":",value29); else _g.h[":"] = value29;
	}
	{
		var value30 = glsl_lex_TokenType.EQUAL;
		if(__map_reserved["="] != null) _g.setReserved("=",value30); else _g.h["="] = value30;
	}
	{
		var value31 = glsl_lex_TokenType.SEMICOLON;
		if(__map_reserved[";"] != null) _g.setReserved(";",value31); else _g.h[";"] = value31;
	}
	{
		var value32 = glsl_lex_TokenType.BANG;
		if(__map_reserved["!"] != null) _g.setReserved("!",value32); else _g.h["!"] = value32;
	}
	{
		var value33 = glsl_lex_TokenType.DASH;
		if(__map_reserved["-"] != null) _g.setReserved("-",value33); else _g.h["-"] = value33;
	}
	{
		var value34 = glsl_lex_TokenType.TILDE;
		if(__map_reserved["~"] != null) _g.setReserved("~",value34); else _g.h["~"] = value34;
	}
	{
		var value35 = glsl_lex_TokenType.PLUS;
		if(__map_reserved["+"] != null) _g.setReserved("+",value35); else _g.h["+"] = value35;
	}
	{
		var value36 = glsl_lex_TokenType.STAR;
		if(__map_reserved["*"] != null) _g.setReserved("*",value36); else _g.h["*"] = value36;
	}
	{
		var value37 = glsl_lex_TokenType.SLASH;
		if(__map_reserved["/"] != null) _g.setReserved("/",value37); else _g.h["/"] = value37;
	}
	{
		var value38 = glsl_lex_TokenType.PERCENT;
		if(__map_reserved["%"] != null) _g.setReserved("%",value38); else _g.h["%"] = value38;
	}
	{
		var value39 = glsl_lex_TokenType.LEFT_ANGLE;
		if(__map_reserved["<"] != null) _g.setReserved("<",value39); else _g.h["<"] = value39;
	}
	{
		var value40 = glsl_lex_TokenType.RIGHT_ANGLE;
		if(__map_reserved[">"] != null) _g.setReserved(">",value40); else _g.h[">"] = value40;
	}
	{
		var value41 = glsl_lex_TokenType.VERTICAL_BAR;
		if(__map_reserved["|"] != null) _g.setReserved("|",value41); else _g.h["|"] = value41;
	}
	{
		var value42 = glsl_lex_TokenType.CARET;
		if(__map_reserved["^"] != null) _g.setReserved("^",value42); else _g.h["^"] = value42;
	}
	{
		var value43 = glsl_lex_TokenType.AMPERSAND;
		if(__map_reserved["&"] != null) _g.setReserved("&",value43); else _g.h["&"] = value43;
	}
	{
		var value44 = glsl_lex_TokenType.QUESTION;
		if(__map_reserved["?"] != null) _g.setReserved("?",value44); else _g.h["?"] = value44;
	}
	$r = _g;
	return $r;
}(this));
glsl_lex_Tokenizer.keywordMap = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = glsl_lex_TokenType.ATTRIBUTE;
		if(__map_reserved.attribute != null) _g.setReserved("attribute",value); else _g.h["attribute"] = value;
	}
	{
		var value1 = glsl_lex_TokenType.UNIFORM;
		if(__map_reserved.uniform != null) _g.setReserved("uniform",value1); else _g.h["uniform"] = value1;
	}
	{
		var value2 = glsl_lex_TokenType.VARYING;
		if(__map_reserved.varying != null) _g.setReserved("varying",value2); else _g.h["varying"] = value2;
	}
	{
		var value3 = glsl_lex_TokenType.CONST;
		if(__map_reserved["const"] != null) _g.setReserved("const",value3); else _g.h["const"] = value3;
	}
	{
		var value4 = glsl_lex_TokenType.VOID;
		if(__map_reserved["void"] != null) _g.setReserved("void",value4); else _g.h["void"] = value4;
	}
	{
		var value5 = glsl_lex_TokenType.INT;
		if(__map_reserved["int"] != null) _g.setReserved("int",value5); else _g.h["int"] = value5;
	}
	{
		var value6 = glsl_lex_TokenType.FLOAT;
		if(__map_reserved["float"] != null) _g.setReserved("float",value6); else _g.h["float"] = value6;
	}
	{
		var value7 = glsl_lex_TokenType.BOOL;
		if(__map_reserved.bool != null) _g.setReserved("bool",value7); else _g.h["bool"] = value7;
	}
	{
		var value8 = glsl_lex_TokenType.VEC2;
		if(__map_reserved.vec2 != null) _g.setReserved("vec2",value8); else _g.h["vec2"] = value8;
	}
	{
		var value9 = glsl_lex_TokenType.VEC3;
		if(__map_reserved.vec3 != null) _g.setReserved("vec3",value9); else _g.h["vec3"] = value9;
	}
	{
		var value10 = glsl_lex_TokenType.VEC4;
		if(__map_reserved.vec4 != null) _g.setReserved("vec4",value10); else _g.h["vec4"] = value10;
	}
	{
		var value11 = glsl_lex_TokenType.BVEC2;
		if(__map_reserved.bvec2 != null) _g.setReserved("bvec2",value11); else _g.h["bvec2"] = value11;
	}
	{
		var value12 = glsl_lex_TokenType.BVEC3;
		if(__map_reserved.bvec3 != null) _g.setReserved("bvec3",value12); else _g.h["bvec3"] = value12;
	}
	{
		var value13 = glsl_lex_TokenType.BVEC4;
		if(__map_reserved.bvec4 != null) _g.setReserved("bvec4",value13); else _g.h["bvec4"] = value13;
	}
	{
		var value14 = glsl_lex_TokenType.IVEC2;
		if(__map_reserved.ivec2 != null) _g.setReserved("ivec2",value14); else _g.h["ivec2"] = value14;
	}
	{
		var value15 = glsl_lex_TokenType.IVEC3;
		if(__map_reserved.ivec3 != null) _g.setReserved("ivec3",value15); else _g.h["ivec3"] = value15;
	}
	{
		var value16 = glsl_lex_TokenType.IVEC4;
		if(__map_reserved.ivec4 != null) _g.setReserved("ivec4",value16); else _g.h["ivec4"] = value16;
	}
	{
		var value17 = glsl_lex_TokenType.MAT2;
		if(__map_reserved.mat2 != null) _g.setReserved("mat2",value17); else _g.h["mat2"] = value17;
	}
	{
		var value18 = glsl_lex_TokenType.MAT3;
		if(__map_reserved.mat3 != null) _g.setReserved("mat3",value18); else _g.h["mat3"] = value18;
	}
	{
		var value19 = glsl_lex_TokenType.MAT4;
		if(__map_reserved.mat4 != null) _g.setReserved("mat4",value19); else _g.h["mat4"] = value19;
	}
	{
		var value20 = glsl_lex_TokenType.SAMPLER2D;
		if(__map_reserved.sampler2D != null) _g.setReserved("sampler2D",value20); else _g.h["sampler2D"] = value20;
	}
	{
		var value21 = glsl_lex_TokenType.SAMPLERCUBE;
		if(__map_reserved.samplerCube != null) _g.setReserved("samplerCube",value21); else _g.h["samplerCube"] = value21;
	}
	{
		var value22 = glsl_lex_TokenType.BREAK;
		if(__map_reserved["break"] != null) _g.setReserved("break",value22); else _g.h["break"] = value22;
	}
	{
		var value23 = glsl_lex_TokenType.CONTINUE;
		if(__map_reserved["continue"] != null) _g.setReserved("continue",value23); else _g.h["continue"] = value23;
	}
	{
		var value24 = glsl_lex_TokenType.WHILE;
		if(__map_reserved["while"] != null) _g.setReserved("while",value24); else _g.h["while"] = value24;
	}
	{
		var value25 = glsl_lex_TokenType.DO;
		if(__map_reserved["do"] != null) _g.setReserved("do",value25); else _g.h["do"] = value25;
	}
	{
		var value26 = glsl_lex_TokenType.FOR;
		if(__map_reserved["for"] != null) _g.setReserved("for",value26); else _g.h["for"] = value26;
	}
	{
		var value27 = glsl_lex_TokenType.IF;
		if(__map_reserved["if"] != null) _g.setReserved("if",value27); else _g.h["if"] = value27;
	}
	{
		var value28 = glsl_lex_TokenType.ELSE;
		if(__map_reserved["else"] != null) _g.setReserved("else",value28); else _g.h["else"] = value28;
	}
	{
		var value29 = glsl_lex_TokenType.RETURN;
		if(__map_reserved["return"] != null) _g.setReserved("return",value29); else _g.h["return"] = value29;
	}
	{
		var value30 = glsl_lex_TokenType.DISCARD;
		if(__map_reserved.discard != null) _g.setReserved("discard",value30); else _g.h["discard"] = value30;
	}
	{
		var value31 = glsl_lex_TokenType.STRUCT;
		if(__map_reserved.struct != null) _g.setReserved("struct",value31); else _g.h["struct"] = value31;
	}
	{
		var value32 = glsl_lex_TokenType.IN;
		if(__map_reserved["in"] != null) _g.setReserved("in",value32); else _g.h["in"] = value32;
	}
	{
		var value33 = glsl_lex_TokenType.OUT;
		if(__map_reserved.out != null) _g.setReserved("out",value33); else _g.h["out"] = value33;
	}
	{
		var value34 = glsl_lex_TokenType.INOUT;
		if(__map_reserved.inout != null) _g.setReserved("inout",value34); else _g.h["inout"] = value34;
	}
	{
		var value35 = glsl_lex_TokenType.INVARIANT;
		if(__map_reserved.invariant != null) _g.setReserved("invariant",value35); else _g.h["invariant"] = value35;
	}
	{
		var value36 = glsl_lex_TokenType.PRECISION;
		if(__map_reserved.precision != null) _g.setReserved("precision",value36); else _g.h["precision"] = value36;
	}
	{
		var value37 = glsl_lex_TokenType.HIGH_PRECISION;
		if(__map_reserved.highp != null) _g.setReserved("highp",value37); else _g.h["highp"] = value37;
	}
	{
		var value38 = glsl_lex_TokenType.MEDIUM_PRECISION;
		if(__map_reserved.mediump != null) _g.setReserved("mediump",value38); else _g.h["mediump"] = value38;
	}
	{
		var value39 = glsl_lex_TokenType.LOW_PRECISION;
		if(__map_reserved.lowp != null) _g.setReserved("lowp",value39); else _g.h["lowp"] = value39;
	}
	{
		var value40 = glsl_lex_TokenType.BOOLCONSTANT;
		if(__map_reserved["true"] != null) _g.setReserved("true",value40); else _g.h["true"] = value40;
	}
	{
		var value41 = glsl_lex_TokenType.BOOLCONSTANT;
		if(__map_reserved["false"] != null) _g.setReserved("false",value41); else _g.h["false"] = value41;
	}
	{
		var value42 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.asm != null) _g.setReserved("asm",value42); else _g.h["asm"] = value42;
	}
	{
		var value43 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["class"] != null) _g.setReserved("class",value43); else _g.h["class"] = value43;
	}
	{
		var value44 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.union != null) _g.setReserved("union",value44); else _g.h["union"] = value44;
	}
	{
		var value45 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["enum"] != null) _g.setReserved("enum",value45); else _g.h["enum"] = value45;
	}
	{
		var value46 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.typedef != null) _g.setReserved("typedef",value46); else _g.h["typedef"] = value46;
	}
	{
		var value47 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.template != null) _g.setReserved("template",value47); else _g.h["template"] = value47;
	}
	{
		var value48 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["this"] != null) _g.setReserved("this",value48); else _g.h["this"] = value48;
	}
	{
		var value49 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.packed != null) _g.setReserved("packed",value49); else _g.h["packed"] = value49;
	}
	{
		var value50 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["goto"] != null) _g.setReserved("goto",value50); else _g.h["goto"] = value50;
	}
	{
		var value51 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["switch"] != null) _g.setReserved("switch",value51); else _g.h["switch"] = value51;
	}
	{
		var value52 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["default"] != null) _g.setReserved("default",value52); else _g.h["default"] = value52;
	}
	{
		var value53 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.inline != null) _g.setReserved("inline",value53); else _g.h["inline"] = value53;
	}
	{
		var value54 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.noinline != null) _g.setReserved("noinline",value54); else _g.h["noinline"] = value54;
	}
	{
		var value55 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["volatile"] != null) _g.setReserved("volatile",value55); else _g.h["volatile"] = value55;
	}
	{
		var value56 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["public"] != null) _g.setReserved("public",value56); else _g.h["public"] = value56;
	}
	{
		var value57 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["static"] != null) _g.setReserved("static",value57); else _g.h["static"] = value57;
	}
	{
		var value58 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.extern != null) _g.setReserved("extern",value58); else _g.h["extern"] = value58;
	}
	{
		var value59 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.external != null) _g.setReserved("external",value59); else _g.h["external"] = value59;
	}
	{
		var value60 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["interface"] != null) _g.setReserved("interface",value60); else _g.h["interface"] = value60;
	}
	{
		var value61 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["long"] != null) _g.setReserved("long",value61); else _g.h["long"] = value61;
	}
	{
		var value62 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["short"] != null) _g.setReserved("short",value62); else _g.h["short"] = value62;
	}
	{
		var value63 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["double"] != null) _g.setReserved("double",value63); else _g.h["double"] = value63;
	}
	{
		var value64 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.half != null) _g.setReserved("half",value64); else _g.h["half"] = value64;
	}
	{
		var value65 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.fixed != null) _g.setReserved("fixed",value65); else _g.h["fixed"] = value65;
	}
	{
		var value66 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.unsigned != null) _g.setReserved("unsigned",value66); else _g.h["unsigned"] = value66;
	}
	{
		var value67 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.input != null) _g.setReserved("input",value67); else _g.h["input"] = value67;
	}
	{
		var value68 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.output != null) _g.setReserved("output",value68); else _g.h["output"] = value68;
	}
	{
		var value69 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.hvec2 != null) _g.setReserved("hvec2",value69); else _g.h["hvec2"] = value69;
	}
	{
		var value70 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.hvec3 != null) _g.setReserved("hvec3",value70); else _g.h["hvec3"] = value70;
	}
	{
		var value71 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.hvec4 != null) _g.setReserved("hvec4",value71); else _g.h["hvec4"] = value71;
	}
	{
		var value72 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.dvec2 != null) _g.setReserved("dvec2",value72); else _g.h["dvec2"] = value72;
	}
	{
		var value73 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.dvec3 != null) _g.setReserved("dvec3",value73); else _g.h["dvec3"] = value73;
	}
	{
		var value74 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.dvec4 != null) _g.setReserved("dvec4",value74); else _g.h["dvec4"] = value74;
	}
	{
		var value75 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.fvec2 != null) _g.setReserved("fvec2",value75); else _g.h["fvec2"] = value75;
	}
	{
		var value76 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.fvec3 != null) _g.setReserved("fvec3",value76); else _g.h["fvec3"] = value76;
	}
	{
		var value77 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.fvec4 != null) _g.setReserved("fvec4",value77); else _g.h["fvec4"] = value77;
	}
	{
		var value78 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.sampler1DShadow != null) _g.setReserved("sampler1DShadow",value78); else _g.h["sampler1DShadow"] = value78;
	}
	{
		var value79 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.sampler2DShadow != null) _g.setReserved("sampler2DShadow",value79); else _g.h["sampler2DShadow"] = value79;
	}
	{
		var value80 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.sampler2DRect != null) _g.setReserved("sampler2DRect",value80); else _g.h["sampler2DRect"] = value80;
	}
	{
		var value81 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.sampler3DRect != null) _g.setReserved("sampler3DRect",value81); else _g.h["sampler3DRect"] = value81;
	}
	{
		var value82 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.sampler2DRectShadow != null) _g.setReserved("sampler2DRectShadow",value82); else _g.h["sampler2DRectShadow"] = value82;
	}
	{
		var value83 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.sizeof != null) _g.setReserved("sizeof",value83); else _g.h["sizeof"] = value83;
	}
	{
		var value84 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.cast != null) _g.setReserved("cast",value84); else _g.h["cast"] = value84;
	}
	{
		var value85 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved["namespace"] != null) _g.setReserved("namespace",value85); else _g.h["namespace"] = value85;
	}
	{
		var value86 = glsl_lex_TokenType.RESERVED_KEYWORD;
		if(__map_reserved.using != null) _g.setReserved("using",value86); else _g.h["using"] = value86;
	}
	$r = _g;
	return $r;
}(this));
glsl_lex_Tokenizer.skippableTypes = [glsl_lex_TokenType.WHITESPACE,glsl_lex_TokenType.BLOCK_COMMENT,glsl_lex_TokenType.LINE_COMMENT];
glsl_parse_Tables.ignoredTokens = [glsl_lex_TokenType.WHITESPACE,glsl_lex_TokenType.LINE_COMMENT,glsl_lex_TokenType.BLOCK_COMMENT];
glsl_parse_Tables.errorRecovery = false;
glsl_parse_Tables.illegalSymbolNumber = 174;
glsl_parse_Tables.nStates = 353;
glsl_parse_Tables.nRules = 222;
glsl_parse_Tables.actionCount = 2555;
glsl_parse_Tables.action = [180,349,348,347,22,45,44,43,42,352,55,54,283,112,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,316,315,314,313,350,345,178,86,179,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,52,51,50,207,74,259,258,257,95,239,238,237,235,267,266,259,258,257,97,2,209,131,32,130,64,124,122,121,14,120,192,180,349,348,347,22,376,244,243,242,344,55,54,283,340,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,316,315,314,313,350,345,111,86,20,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,117,206,9,207,74,71,252,59,95,239,238,237,235,267,266,259,258,257,97,2,210,131,337,130,64,124,122,121,14,120,192,180,349,348,347,22,69,252,59,49,48,55,54,283,39,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,316,315,314,313,350,345,98,86,31,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,185,206,9,207,74,47,46,37,95,239,238,237,235,267,266,259,258,257,97,1,233,131,24,130,64,124,122,121,14,120,192,180,349,348,347,22,41,40,33,21,35,55,54,283,36,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,316,315,314,313,157,34,350,345,19,86,25,343,342,110,177,23,285,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,234,207,74,31,73,56,95,239,238,237,235,267,266,259,258,257,97,2,286,131,292,130,64,124,122,121,14,120,192,180,349,348,347,22,262,59,284,66,287,55,54,283,28,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,316,315,314,313,256,350,345,78,86,253,343,342,110,177,23,285,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,249,162,207,74,73,56,181,95,239,238,237,235,267,266,259,258,257,97,231,27,131,31,130,64,124,122,121,14,120,192,350,345,94,86,254,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,351,250,221,134,113,67,261,158,61,153,163,152,26,228,58,222,13,230,165,265,291,290,229,265,65,346,218,236,87,62,219,133,248,31,188,220,217,216,215,214,213,5,350,345,94,86,31,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,247,232,221,134,113,67,261,158,61,153,341,152,60,228,58,67,261,230,30,265,31,377,378,70,115,236,218,379,195,265,219,132,31,380,208,220,217,216,215,214,213,350,345,94,86,381,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,382,383,221,134,113,67,261,158,61,153,384,152,260,228,58,385,386,230,387,265,388,389,390,391,392,265,218,212,18,211,219,114,206,9,188,220,217,216,215,214,213,3,350,345,94,86,186,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,81,127,221,134,113,67,261,158,61,153,17,152,8,228,58,67,261,230,79,265,199,7,197,227,196,193,218,16,116,265,219,125,15,187,208,220,217,216,215,214,213,350,345,94,86,63,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,205,12,221,134,113,67,261,158,61,153,202,152,10,228,58,77,161,230,160,265,255,184,1,4,200,68,218,29,57,75,219,263,251,577,188,220,217,216,215,214,213,6,350,345,94,86,577,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,577,221,134,113,67,261,158,61,153,577,152,577,228,58,577,577,230,577,265,577,577,577,577,577,577,218,577,577,577,80,577,201,203,577,577,217,216,215,214,213,350,345,94,86,577,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,577,221,134,113,67,261,158,61,153,577,152,577,228,58,577,577,230,577,265,577,577,577,577,577,577,218,577,577,577,80,577,198,203,577,577,217,216,215,214,213,577,350,345,94,86,577,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,577,221,134,113,67,261,158,61,153,577,152,577,228,58,577,577,230,577,265,577,577,577,577,577,577,218,577,577,577,219,577,577,577,208,220,217,216,215,214,213,350,345,94,86,577,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,577,221,134,113,67,261,158,61,153,577,152,577,228,58,577,577,230,577,265,577,577,577,577,577,577,218,577,577,577,82,577,577,577,577,577,217,216,215,214,213,577,350,345,94,86,577,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,577,221,134,113,67,261,158,61,153,577,152,577,228,58,577,577,230,577,265,577,577,577,577,577,577,189,577,577,577,577,577,577,577,577,577,190,577,180,349,348,347,22,577,11,577,577,577,55,54,283,577,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,316,315,314,313,350,345,93,86,577,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,577,577,207,74,577,577,577,95,239,238,237,235,267,266,259,258,257,97,180,349,348,347,22,577,577,577,577,577,55,54,283,577,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,316,315,314,313,180,349,348,347,22,577,577,577,577,577,55,54,339,577,335,334,333,332,331,330,329,328,327,326,325,324,323,322,321,320,316,315,314,313,577,154,239,238,237,235,267,266,259,258,257,97,577,350,345,129,86,577,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,577,577,577,577,67,261,577,577,577,577,128,577,228,58,350,345,129,86,265,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,191,577,123,119,67,261,353,577,577,577,128,577,228,58,577,577,577,577,265,283,577,282,281,280,279,278,277,276,275,274,273,272,271,270,269,268,264,577,577,577,577,577,126,283,577,282,281,280,279,278,277,276,275,274,273,272,271,270,269,268,264,304,303,302,301,300,299,298,297,296,295,294,74,577,577,577,95,239,238,237,235,267,266,259,258,257,97,244,243,242,154,239,238,237,235,577,74,577,192,577,95,239,238,237,235,267,266,259,258,257,97,577,577,577,577,577,577,577,577,577,577,577,192,577,180,349,348,347,22,577,577,577,577,577,55,54,577,577,335,334,333,332,331,330,329,328,327,326,325,324,323,322,321,320,316,315,314,313,577,577,577,577,577,577,577,577,577,577,577,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,84,194,577,180,349,348,347,22,577,577,577,577,577,55,54,577,577,335,334,333,332,331,330,329,328,327,326,325,324,323,322,321,320,316,315,314,313,350,345,577,86,577,343,342,110,177,23,285,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,89,350,345,204,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,83,577,350,345,118,86,577,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,350,345,91,86,577,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,350,345,92,86,577,343,342,110,177,23,306,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,350,345,577,86,577,343,342,110,177,23,577,176,336,319,53,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,101,175,174,172,170,168,99,288,453,164,350,345,577,86,577,343,342,110,177,23,289,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,350,345,577,86,577,343,342,110,177,23,293,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,577,577,577,577,244,243,242,154,239,238,237,235,577,350,345,577,86,577,343,342,110,177,23,305,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,577,350,345,577,86,577,343,342,110,177,23,308,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,101,175,174,172,170,168,99,288,577,159,577,67,261,577,577,577,577,577,246,96,577,577,245,350,345,265,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,101,175,174,172,170,168,99,288,577,156,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,101,175,174,172,170,168,99,288,577,155,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,101,175,174,172,170,168,99,288,577,151,577,577,577,577,577,577,577,577,577,577,350,345,577,86,577,343,342,110,177,23,338,176,336,72,53,90,109,108,85,101,175,174,172,170,168,99,307,283,577,282,281,280,279,278,277,276,275,274,273,272,271,270,269,268,264,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,101,175,174,172,170,166,283,577,282,281,280,279,278,277,276,275,274,273,272,271,270,269,268,264,577,267,266,259,258,257,97,577,577,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,101,175,174,172,167,577,577,577,577,577,577,577,577,577,577,577,267,266,577,350,345,97,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,101,175,174,169,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,101,175,171,576,38,577,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,101,173,577,577,577,577,577,577,577,224,182,113,67,261,158,61,153,577,152,577,228,58,577,577,230,577,265,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,108,85,100,223,577,577,577,577,577,577,183,225,76,224,182,113,67,261,158,61,153,577,152,577,228,58,350,345,230,86,265,343,342,110,177,23,577,176,336,309,53,90,109,105,577,577,577,577,577,577,577,223,577,577,577,577,577,577,226,225,76,577,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,104,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,103,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,109,102,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,107,577,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,90,106,577,577,577,577,350,345,577,86,577,343,342,110,177,23,577,176,336,309,53,88,350,345,577,86,577,343,342,110,177,23,577,176,336,318,53,350,345,577,86,577,343,342,110,177,23,577,176,336,317,53,350,345,577,86,577,343,342,110,177,23,577,176,336,312,53,350,345,577,86,577,343,342,110,177,23,577,176,336,311,53,350,345,577,86,577,343,342,110,177,23,577,176,336,310,53,67,261,577,577,577,577,577,241,96,577,577,240,577,577,265];
glsl_parse_Tables.lookahead = [1,2,3,4,5,40,41,42,43,65,11,12,13,1,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,35,36,37,65,66,77,78,79,70,71,72,73,74,75,76,77,78,79,80,81,82,83,7,85,86,87,88,89,90,91,92,1,2,3,4,5,5,67,68,69,8,11,12,13,6,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,96,97,98,99,54,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,150,151,152,65,66,143,144,145,70,71,72,73,74,75,76,77,78,79,80,81,82,83,5,85,86,87,88,89,90,91,92,1,2,3,4,5,143,144,145,31,32,11,12,13,46,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,96,97,98,99,14,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,150,151,152,65,66,38,39,47,70,71,72,73,74,75,76,77,78,79,80,81,5,83,7,85,86,87,88,89,90,91,92,1,2,3,4,5,44,45,51,52,49,11,12,13,48,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,1,50,96,97,54,99,7,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,133,65,66,14,137,138,70,71,72,73,74,75,76,77,78,79,80,81,141,83,10,85,86,87,88,89,90,91,92,1,2,3,4,5,144,145,65,81,8,11,12,13,53,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,65,96,97,146,99,148,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,133,1,65,66,137,138,14,70,71,72,73,74,75,76,77,78,79,80,141,7,83,14,85,86,87,88,89,90,91,92,96,97,98,99,8,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,65,6,125,126,127,128,129,130,131,132,129,134,7,136,137,65,7,140,9,142,11,12,1,142,81,6,149,73,1,14,153,154,8,14,157,158,159,160,161,162,163,164,96,97,98,99,14,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,8,8,125,126,127,128,129,130,131,132,6,134,6,136,137,128,129,140,14,142,14,5,5,136,6,73,149,5,65,142,153,154,14,5,157,158,159,160,161,162,163,96,97,98,99,5,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,5,5,125,126,127,128,129,130,131,132,5,134,129,136,137,5,5,140,5,142,5,5,5,5,5,142,149,82,5,82,153,150,151,152,157,158,159,160,161,162,163,164,96,97,98,99,165,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,5,1,125,126,127,128,129,130,131,132,54,134,6,136,137,128,129,140,5,142,82,6,65,136,65,65,149,65,85,142,153,154,5,65,157,158,159,160,161,162,163,96,97,98,99,84,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,154,152,125,126,127,128,129,130,131,132,154,134,152,136,137,14,147,140,1,142,148,156,81,152,82,128,149,123,138,81,153,82,82,173,157,158,159,160,161,162,163,164,96,97,98,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,173,125,126,127,128,129,130,131,132,173,134,173,136,137,173,173,140,173,142,173,173,173,173,173,173,149,173,173,173,153,173,155,156,173,173,159,160,161,162,163,96,97,98,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,173,125,126,127,128,129,130,131,132,173,134,173,136,137,173,173,140,173,142,173,173,173,173,173,173,149,173,173,173,153,173,155,156,173,173,159,160,161,162,163,173,96,97,98,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,173,125,126,127,128,129,130,131,132,173,134,173,136,137,173,173,140,173,142,173,173,173,173,173,173,149,173,173,173,153,173,173,173,157,158,159,160,161,162,163,96,97,98,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,173,125,126,127,128,129,130,131,132,173,134,173,136,137,173,173,140,173,142,173,173,173,173,173,173,149,173,173,173,153,173,173,173,173,173,159,160,161,162,163,173,96,97,98,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,173,125,126,127,128,129,130,131,132,173,134,173,136,137,173,173,140,173,142,173,173,173,173,173,173,149,173,173,173,173,173,173,173,173,173,159,173,1,2,3,4,5,173,167,173,173,173,11,12,13,173,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,96,97,98,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,173,173,65,66,173,173,173,70,71,72,73,74,75,76,77,78,79,80,1,2,3,4,5,173,173,173,173,173,11,12,13,173,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,1,2,3,4,5,173,173,173,173,173,11,12,13,173,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,173,70,71,72,73,74,75,76,77,78,79,80,173,96,97,98,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,173,173,173,173,128,129,173,173,173,173,134,173,136,137,96,97,98,99,142,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,166,173,168,169,128,129,0,173,173,173,134,173,136,137,173,173,173,173,142,13,173,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,173,173,173,173,173,166,13,173,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,54,55,56,57,58,59,60,61,62,63,64,66,173,173,173,70,71,72,73,74,75,76,77,78,79,80,67,68,69,70,71,72,73,74,173,66,173,92,173,70,71,72,73,74,75,76,77,78,79,80,173,173,173,173,173,173,173,173,173,173,173,92,173,1,2,3,4,5,173,173,173,173,173,11,12,173,173,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,173,173,173,173,173,173,173,173,173,173,173,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,65,173,1,2,3,4,5,173,173,173,173,173,11,12,173,173,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,96,97,173,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,96,97,141,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,173,96,97,98,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,96,97,98,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,96,97,98,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,6,124,96,97,173,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,96,97,173,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,173,173,173,173,67,68,69,70,71,72,73,74,173,96,97,173,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,96,97,173,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,124,173,128,129,173,173,173,173,173,135,136,173,173,139,96,97,142,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,124,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,124,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,173,124,173,173,173,173,173,173,173,173,173,173,96,97,173,99,173,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,13,173,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,116,117,118,119,120,13,173,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,173,75,76,77,78,79,80,173,173,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,116,117,118,119,173,173,173,173,173,173,173,173,173,173,173,75,76,173,96,97,80,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,116,117,118,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,116,117,94,95,173,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,116,173,173,173,173,173,173,173,125,126,127,128,129,130,131,132,173,134,173,136,137,173,173,140,173,142,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,114,115,163,173,173,173,173,173,173,170,171,172,125,126,127,128,129,130,131,132,173,134,173,136,137,96,97,140,99,142,101,102,103,104,105,173,107,108,109,110,111,112,113,173,173,173,173,173,173,173,163,173,173,173,173,173,173,170,171,172,173,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,113,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,173,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,112,173,173,173,173,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,111,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,96,97,173,99,173,101,102,103,104,105,173,107,108,109,110,128,129,173,173,173,173,173,135,136,173,173,139,173,173,142];
glsl_parse_Tables.shiftUseDefault = -57;
glsl_parse_Tables.shiftCount = 182;
glsl_parse_Tables.shiftOffsetMin = -56;
glsl_parse_Tables.shiftOffsetMax = 2105;
glsl_parse_Tables.shiftOffset = [1403,275,91,275,275,275,-1,183,183,367,1141,1221,1221,1562,1496,1562,1562,1562,1562,1562,1562,1562,1562,1255,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1379,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,1562,2062,2062,2062,2062,709,1778,1393,709,709,-57,-57,2105,2105,711,778,710,1380,31,-11,703,702,778,762,-57,-57,-57,-57,-35,-35,-35,496,260,26,26,26,574,519,562,437,508,309,430,328,232,237,237,212,212,212,212,161,161,212,161,560,506,76,422,654,661,720,636,208,655,653,652,650,708,706,631,699,649,693,208,688,647,571,569,-56,643,642,641,640,639,637,635,634,629,620,619,596,584,578,573,572,549,514,502,441,548,511,492,482,456,442,337,295,310,369,349,261,236,261,241,236,205,241,151,205,151,170,99,208,93,92,12,-56];
glsl_parse_Tables.reduceUseDefault = -63;
glsl_parse_Tables.reduceCount = 82;
glsl_parse_Tables.reduceMin = -62;
glsl_parse_Tables.reduceMax = 2429;
glsl_parse_Tables.reduceOffset = [2134,364,638,570,501,433,844,775,707,912,981,1207,1249,-62,1618,1591,1564,1501,1080,307,216,122,30,1952,1913,1884,1855,1813,1786,1758,1717,1690,1661,1997,2049,2087,2110,2135,2182,2181,1544,1446,2296,2278,2260,2224,2332,2314,2353,1528,2429,2414,2399,2384,2369,1646,2412,1811,580,443,505,297,206,95,3,46,15,507,368,229,259,229,665,651,658,632,626,633,630,621,617,610,607];
glsl_parse_Tables.defaultAction = [575,572,575,572,575,572,575,575,575,575,575,555,575,575,575,575,556,575,575,575,575,575,575,371,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,575,571,464,464,571,571,573,573,575,575,573,575,573,401,464,575,571,575,575,574,571,572,571,572,418,417,416,393,475,407,406,405,575,575,575,575,575,468,575,575,431,420,419,415,414,413,412,410,409,411,408,575,575,471,575,546,575,575,575,557,575,575,575,575,575,575,575,575,575,575,547,575,575,575,575,575,507,503,502,501,500,499,498,497,496,495,494,493,492,491,490,489,575,474,454,575,575,575,458,575,575,518,575,575,575,575,575,430,428,429,426,427,424,425,422,423,421,575,575,366,575,354,575,568,563,569,545,544,550,540,553,552,554,570,562,560,561,559,558,551,535,534,549,525,524,548,523,522,542,541,539,538,537,536,533,532,531,530,529,528,527,526,521,543,567,566,565,564,480,479,478,470,477,476,457,456,485,484,483,482,481,463,461,467,466,465,462,460,469,459,455,452,512,513,516,519,517,515,510,509,508,487,486,514,511,507,506,505,504,503,502,501,500,499,498,497,496,495,494,493,492,491,490,489,488,451,520,473,472,448,447,365,364,363,373,445,444,443,442,441,440,439,438,437,436,435,434,446,433,432,401,404,403,402,400,399,398,397,396,395,394,392,391,390,389,388,387,386,385,384,383,382,381,380,379,378,377,375,374,372,370,369,368,367,362,361,360,359,358,357,356,355,450,449];
glsl_parse_Tables.ruleInfo = [[94,1],[96,1],[97,1],[97,1],[97,1],[97,1],[97,3],[99,1],[99,4],[99,1],[99,3],[99,2],[99,2],[100,1],[101,1],[102,2],[102,2],[104,2],[104,1],[103,2],[103,3],[105,2],[107,1],[107,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[108,1],[109,1],[109,2],[109,2],[109,2],[110,1],[110,1],[110,1],[110,1],[111,1],[111,3],[111,3],[111,3],[112,1],[112,3],[112,3],[113,1],[113,3],[113,3],[114,1],[114,3],[114,3],[114,3],[114,3],[115,1],[115,3],[115,3],[116,1],[116,3],[117,1],[117,3],[118,1],[118,3],[119,1],[119,3],[120,1],[120,3],[121,1],[121,3],[122,1],[122,5],[106,1],[106,3],[123,1],[123,1],[123,1],[123,1],[123,1],[123,1],[123,1],[123,1],[123,1],[123,1],[123,1],[98,1],[98,3],[124,1],[125,2],[125,2],[125,4],[126,2],[130,1],[130,1],[132,2],[132,3],[131,3],[135,2],[135,5],[133,3],[133,2],[133,3],[133,2],[138,0],[138,1],[138,1],[138,1],[139,1],[139,4],[127,1],[127,3],[127,6],[127,5],[140,1],[140,2],[140,5],[140,4],[140,2],[134,1],[134,2],[137,1],[137,1],[137,1],[137,2],[137,1],[136,1],[136,2],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[129,1],[128,1],[128,1],[128,1],[142,5],[142,4],[143,1],[143,2],[144,5],[146,1],[146,3],[148,1],[148,4],[141,1],[149,1],[150,1],[150,3],[155,1],[155,2],[157,1],[157,1],[153,1],[153,1],[153,1],[153,1],[153,1],[153,1],[151,2],[151,5],[156,3],[156,4],[158,2],[158,3],[164,1],[164,2],[159,1],[159,2],[160,5],[165,3],[165,1],[166,1],[166,4],[161,6],[161,7],[161,7],[167,1],[167,1],[169,1],[169,0],[168,2],[168,3],[162,2],[162,2],[162,2],[162,3],[162,2],[95,1],[95,2],[170,1],[170,1],[170,1],[172,1],[171,2],[163,1],[152,0],[154,0],[145,0],[147,0]];
glsl_parse_Tables.tokenIdMap = (function($this) {
	var $r;
	var _g = new haxe_ds_EnumValueMap();
	_g.set(glsl_lex_TokenType.IDENTIFIER,1);
	_g.set(glsl_lex_TokenType.IVEC2,24);
	_g.set(glsl_lex_TokenType.IVEC3,25);
	_g.set(glsl_lex_TokenType.IVEC4,26);
	_g.set(glsl_lex_TokenType.STRUCT,80);
	_g.set(glsl_lex_TokenType.INC_OP,11);
	_g.set(glsl_lex_TokenType.AMPERSAND,46);
	_g.set(glsl_lex_TokenType.WHILE,85);
	_g.set(glsl_lex_TokenType.COLON,53);
	_g.set(glsl_lex_TokenType.COMMA,14);
	_g.set(glsl_lex_TokenType.CONST,71);
	_g.set(glsl_lex_TokenType.MUL_ASSIGN,55);
	_g.set(glsl_lex_TokenType.SEMICOLON,65);
	_g.set(glsl_lex_TokenType.VERTICAL_BAR,48);
	_g.set(glsl_lex_TokenType.LEFT_ANGLE,40);
	_g.set(glsl_lex_TokenType.OR_ASSIGN,64);
	_g.set(glsl_lex_TokenType.SAMPLER2D,75);
	_g.set(glsl_lex_TokenType.DIV_ASSIGN,56);
	_g.set(glsl_lex_TokenType.LEFT_BRACKET,7);
	_g.set(glsl_lex_TokenType.XOR_OP,50);
	_g.set(glsl_lex_TokenType.FLOATCONSTANT,3);
	_g.set(glsl_lex_TokenType.VARYING,73);
	_g.set(glsl_lex_TokenType.LEFT_BRACE,81);
	_g.set(glsl_lex_TokenType.LE_OP,42);
	_g.set(glsl_lex_TokenType.EQUAL,54);
	_g.set(glsl_lex_TokenType.EQ_OP,44);
	_g.set(glsl_lex_TokenType.INVARIANT,70);
	_g.set(glsl_lex_TokenType.LEFT_PAREN,5);
	_g.set(glsl_lex_TokenType.XOR_ASSIGN,63);
	_g.set(glsl_lex_TokenType.LEFT_OP,38);
	_g.set(glsl_lex_TokenType.RIGHT_ANGLE,41);
	_g.set(glsl_lex_TokenType.LEFT_ASSIGN,60);
	_g.set(glsl_lex_TokenType.RIGHT_BRACKET,8);
	_g.set(glsl_lex_TokenType.ATTRIBUTE,72);
	_g.set(glsl_lex_TokenType.HIGH_PRECISION,77);
	_g.set(glsl_lex_TokenType.PERCENT,37);
	_g.set(glsl_lex_TokenType.ADD_ASSIGN,58);
	_g.set(glsl_lex_TokenType.PRECISION,66);
	_g.set(glsl_lex_TokenType.SLASH,36);
	_g.set(glsl_lex_TokenType.DO,86);
	_g.set(glsl_lex_TokenType.IF,83);
	_g.set(glsl_lex_TokenType.IN,67);
	_g.set(glsl_lex_TokenType.DOT,9);
	_g.set(glsl_lex_TokenType.FOR,87);
	_g.set(glsl_lex_TokenType.QUESTION,52);
	_g.set(glsl_lex_TokenType.INT,16);
	_g.set(glsl_lex_TokenType.OUT,68);
	_g.set(glsl_lex_TokenType.FLOAT,15);
	_g.set(glsl_lex_TokenType.CONTINUE,88);
	_g.set(glsl_lex_TokenType.RIGHT_BRACE,82);
	_g.set(glsl_lex_TokenType.INTCONSTANT,2);
	_g.set(glsl_lex_TokenType.MOD_ASSIGN,57);
	_g.set(glsl_lex_TokenType.TILDE,34);
	_g.set(glsl_lex_TokenType.SUB_ASSIGN,59);
	_g.set(glsl_lex_TokenType.GE_OP,43);
	_g.set(glsl_lex_TokenType.RIGHT_PAREN,6);
	_g.set(glsl_lex_TokenType.AND_OP,49);
	_g.set(glsl_lex_TokenType.TYPE_NAME,30);
	_g.set(glsl_lex_TokenType.NE_OP,45);
	_g.set(glsl_lex_TokenType.DEC_OP,12);
	_g.set(glsl_lex_TokenType.MEDIUM_PRECISION,78);
	_g.set(glsl_lex_TokenType.LOW_PRECISION,79);
	_g.set(glsl_lex_TokenType.RIGHT_ASSIGN,61);
	_g.set(glsl_lex_TokenType.BANG,33);
	_g.set(glsl_lex_TokenType.BOOL,17);
	_g.set(glsl_lex_TokenType.DASH,32);
	_g.set(glsl_lex_TokenType.BOOLCONSTANT,4);
	_g.set(glsl_lex_TokenType.ELSE,84);
	_g.set(glsl_lex_TokenType.FIELD_SELECTION,10);
	_g.set(glsl_lex_TokenType.DISCARD,91);
	_g.set(glsl_lex_TokenType.MAT2,27);
	_g.set(glsl_lex_TokenType.MAT3,28);
	_g.set(glsl_lex_TokenType.MAT4,29);
	_g.set(glsl_lex_TokenType.OR_OP,51);
	_g.set(glsl_lex_TokenType.PLUS,31);
	_g.set(glsl_lex_TokenType.UNIFORM,74);
	_g.set(glsl_lex_TokenType.BREAK,89);
	_g.set(glsl_lex_TokenType.AND_ASSIGN,62);
	_g.set(glsl_lex_TokenType.STAR,35);
	_g.set(glsl_lex_TokenType.VEC2,18);
	_g.set(glsl_lex_TokenType.VEC3,19);
	_g.set(glsl_lex_TokenType.VEC4,20);
	_g.set(glsl_lex_TokenType.VOID,13);
	_g.set(glsl_lex_TokenType.PREPROCESSOR_DIRECTIVE,92);
	_g.set(glsl_lex_TokenType.BVEC2,21);
	_g.set(glsl_lex_TokenType.BVEC3,22);
	_g.set(glsl_lex_TokenType.BVEC4,23);
	_g.set(glsl_lex_TokenType.RETURN,90);
	_g.set(glsl_lex_TokenType.INOUT,69);
	_g.set(glsl_lex_TokenType.RIGHT_OP,39);
	_g.set(glsl_lex_TokenType.CARET,47);
	_g.set(glsl_lex_TokenType.SAMPLERCUBE,76);
	$r = _g;
	return $r;
}(this));
glsl_parse_Parser.preprocess = true;
glsl_parse_Parser.errorRecovery = false;
glsl_parse_Parser.illegalSymbolNumber = 174;
glsl_parse_Parser.nStates = 353;
glsl_parse_Parser.nRules = 222;
glsl_parse_Parser.noAction = 577;
glsl_parse_Parser.acceptAction = 576;
glsl_parse_Parser.errorAction = 575;
glsl_parse_Parser.actionCount = 2555;
glsl_parse_Parser.action = glsl_parse_Tables.action;
glsl_parse_Parser.lookahead = glsl_parse_Tables.lookahead;
glsl_parse_Parser.shiftUseDefault = -57;
glsl_parse_Parser.shiftCount = 182;
glsl_parse_Parser.shiftOffsetMin = -56;
glsl_parse_Parser.shiftOffsetMax = 2105;
glsl_parse_Parser.shiftOffset = glsl_parse_Tables.shiftOffset;
glsl_parse_Parser.reduceUseDefault = -63;
glsl_parse_Parser.reduceCount = 82;
glsl_parse_Parser.reduceMin = -62;
glsl_parse_Parser.reduceMax = 2429;
glsl_parse_Parser.reduceOffset = glsl_parse_Tables.reduceOffset;
glsl_parse_Parser.defaultAction = glsl_parse_Tables.defaultAction;
glsl_parse_Parser.ruleInfo = glsl_parse_Tables.ruleInfo;
glsl_parse_Parser.tokenIdMap = glsl_parse_Tables.tokenIdMap;
glsl_parse_Parser.ignoredTokens = glsl_parse_Tables.ignoredTokens;
glsl_preprocess_Preprocessor.directiveTitleReg = new EReg("^#\\s*([^\\s]*)","");
glsl_preprocess_Preprocessor.macroNameReg = new EReg("^([a-z_]\\w*)([^\\w]|$)","i");
js_Boot.__toStr = {}.toString;
GLSLParser.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=glsl_parser.js.map
