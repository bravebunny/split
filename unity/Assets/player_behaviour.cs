using UnityEngine;
using System.Collections;

public class player_behaviour : MonoBehaviour {

	private float startingHeight;
	
	public bool alive = true;
	
	private bool jumping = false;
	private bool sliding = false;

	private Animator anim;

	// Use this for initialization
	void Start () {
		startingHeight = rigidbody.transform.position.y;
		Physics.gravity = new Vector3(0, -30, 0);

		anim = GetComponent<Animator>();
	}
	
	// Update is called once per frame
	void Update () {
		if (rigidbody.transform.position.y <= startingHeight) {
			if (Mathf.Sign(rigidbody.velocity.y) < 0 && jumping){
				rigidbody.velocity = new Vector2(0, 0);
				jumping = false;
				anim.SetTrigger ("Grounded");
			}
			rigidbody.transform.position = new Vector3(rigidbody.transform.position.x, startingHeight, rigidbody.transform.position.z);

			if (Input.GetButtonDown("Jump")) {
				rigidbody.velocity = new Vector2(0, 20);
				jumping = true;
				anim.SetTrigger ("Jump");
			}
			else if (Input.GetButtonDown("Slide")) {
				sliding = true;
				anim.SetTrigger ("Slide");
			}
			else if (Input.GetButtonDown("Spit")) {
				sliding = true;
				anim.SetTrigger ("Spit");
			}
		}
	}

	void OnCollisionEnter(Collision c) {
		print (c.gameObject.name);
		if (c.gameObject.name == "Stone(Clone)") {
			alive = false;
			Destroy (rigidbody.gameObject);
		} else {
			print ("BANANANA");
		}
		//alive = false;
		//Destroy (rigidbody.gameObject);
	}
}
