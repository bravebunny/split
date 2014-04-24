using UnityEngine;
using System.Collections;

public class player_behaviour : MonoBehaviour {

	public float jumpForce = 1000f;

	private float startingHeight;
	//private float startingGravityScale;
	
	private bool jumping = false;
	private bool sliding = false;

	private Animator anim;

	// Use this for initialization
	void Start () {
		startingHeight = rigidbody.transform.position.y;
		//startingGravityScale = llama.gravityScale;
		Physics.gravity = new Vector3(0,-15,0);

		anim = GetComponent<Animator>();
	}
	
	// Update is called once per frame
	void Update () {
		if (rigidbody.transform.position.y <= startingHeight) {
			if (Mathf.Sign(rigidbody.velocity.y) < 0 && jumping){
				//llama.gravityScale = 0f;
				rigidbody.velocity = new Vector2(0, 0);
				jumping = false;
				anim.SetTrigger ("Grounded");
			}
			rigidbody.transform.position = new Vector3(rigidbody.transform.position.x, startingHeight, rigidbody.transform.position.z);

			if (Input.GetButtonDown("Jump")) {
				//llama.gravityScale = startingGravityScale;
				rigidbody.AddForce(new Vector3(0, jumpForce,0));
				jumping = true;
				anim.SetTrigger ("Jump");
			}
			else if (Input.GetButtonDown("Slide")) {
				//llama.gravityScale = startingGravityScale;
				sliding = true;
				anim.SetTrigger ("Slide");
			}
			else if (Input.GetButtonDown("Spit")) {
				//llama.gravityScale = startingGravityScale;
				sliding = true;
				anim.SetTrigger ("Spit");
			}
		}
	}
}
