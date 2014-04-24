#pragma strict

var speed = 0f;

function Update () {
	renderer.material.mainTextureOffset = new Vector2((Time.time * speed) % 1, 0f);
}
