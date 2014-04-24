using UnityEngine;
using System.Collections;

public class player_behaviour : MonoBehaviour {

	private float startingX;
	private float startingY;
	private float startingZ;
	
	public bool alive = true;
	public bool woohoo = false;

	private bool jumping = false;
	private bool sliding = false;

	private Animator anim;

	// Use this for initialization
	void Start () {
		startingX = rigidbody.transform.position.x;
		startingY = rigidbody.transform.position.y;
		startingZ = rigidbody.transform.position.z;

		Physics.gravity = new Vector3(0, -30, 0);

		anim = GetComponent<Animator>();
	}
	
	// Update is called once per frame
	void Update () {
		if (rigidbody.transform.position.y <= startingY) {
			if (Mathf.Sign(rigidbody.velocity.y) < 0 && jumping){
				rigidbody.velocity = new Vector2(0, 0);
				jumping = false;
				anim.SetTrigger ("Grounded");
			}
			rigidbody.transform.position = new Vector3(rigidbody.transform.position.x, startingY, rigidbody.transform.position.z);

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

	public void revive(){
		rigidbody.transform.position = new Vector3 (startingX, startingY, startingZ);
		rigidbody.velocity = new Vector3 (0,0,0);
		rigidbody.rotation = Quaternion.identity;
		//rigidbody.rotation = new Vector3 (0,0,0);
		
		alive = true;
		print("JESUS");
	}
	
	void OnTriggerEnter(Collider c) {
		if (alive) {
			if (c.gameObject.name == "Stone(Clone)") {
				alive = false;
			} else {
				woohoo = true;
			}
		}
	}
}
