using UnityEngine;
using System.Collections;

public class player_behaviour : MonoBehaviour {

	public Rigidbody llama;

	private float startingHeight;
	//private float startingGravityScale;

	private bool jumping = false;

	// Use this for initialization
	void Start () {
		startingHeight = llama.transform.position.y;
		//startingGravityScale = llama.gravityScale;
		Physics.gravity = new Vector3(0,-15,0);
	}
	
	// Update is called once per frame
	void Update () {
		if (llama.transform.position.y <= startingHeight) {
			if (Mathf.Sign(llama.velocity.y) < 0){
				//llama.gravityScale = 0f;
				llama.velocity = new Vector2(0, 0);
				jumping = false;
			}
			llama.transform.position = new Vector3(llama.transform.position.x, startingHeight, llama.transform.position.z);

			if (Input.GetKeyDown(KeyCode.Space)) {
				//llama.gravityScale = startingGravityScale;
				llama.AddForce(new Vector2(0, 630f));
				jumping = true;
			}
		}

		if (jumping) {
			//animate
		}
	}
}
