#pragma strict

var	isCam			: boolean	= true;
var isPerlin		: boolean	= true;
var	isSin			: boolean	= true;
var	magnitude		: float	= 1f;
var	frequency		: float	= 0.8f;
var	shakedObj		: GameObject;
var	isShake			: boolean	= false;
var	orgRot			: Quaternion;
var	orgTrs			: Vector3;
var	orgCamRot		: float;
var	ttShake			: float = 1f;
var	teShake			: float = 0f;

if ( shakedObj != null ){
	orgRot	= shakedObj.transform.localRotation;
	orgTrs	= shakedObj.transform.position;
	orgCamRot	= Camera.main.transform.localEulerAngles.x;
}

function Update () {
	TouchCheck();
	if ( isShake ){
		teShake			+= Time.deltaTime;
		var	shakeVal	: float	= 0;
		if ( isPerlin )	shakeVal	+= shakeVal + ShakePerlin	(  magnitude, frequency, teShake, ttShake );
		if ( isSin )	shakeVal	+= shakeVal + ShakeSin		(  magnitude, frequency, teShake, ttShake );
		if ( isCam ){
			Camera.main.transform.localEulerAngles.x	= orgCamRot + shakeVal;
		} else if ( shakedObj != null ){
			shakedObj.transform.position.x				= orgTrs.x + shakeVal;
		}
		if ( teShake >= ttShake ){
			isShake	= !isShake;
			teShake	= 0f;
		}
	}
}

function TouchCheck () {
	if (Input.GetMouseButtonDown(0)){
		isShake		= !isShake;
	}
}

function ShakeSin ( mag:float, frq:float, te:float, tt:float ){
	var	returnVal	: float		= Mathf.Sin (Time.frameCount * frq ) * mag;
	var	damper		: float = 1.0f - Mathf.Clamp(te / tt, 0.0f, 1.0f);
	returnVal		*= damper;
	return ( returnVal );
}

function ShakePerlin ( mag:float, frq:float, te:float, tt:float){
	var	returnVal		: float;
	var	damper			: float = 1.0f - Mathf.Clamp(te / tt, 0.0f, 1.0f);
	returnVal			= Perlin(mag, frq) * damper;
	return ( returnVal );
}

function Perlin(mag:float, frq:float ){
	var	returnVal	: float;
	var	seed		: float		= Time.time * frq*4;
	returnVal	= Mathf.Clamp01(Mathf.PerlinNoise ( seed, 0f )) - 0.5f;
	returnVal	= returnVal * mag*3;
	return ( returnVal );
}
