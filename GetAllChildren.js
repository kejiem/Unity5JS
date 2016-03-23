function GetAllChildren ( obj:GameObject ){
	var varReturn : Transform[];
	var tmp = new Array();
	for each ( i in obj.GetComponentsInChildren(Transform)){
		var trn : Transform;
		trn = i as Transform;
		tmp.Push(trn);
	}
	varReturn = tmp.ToBuiltin(Transform) as Transform[];

	return(varReturn);
}