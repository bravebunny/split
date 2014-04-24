using UnityEngine;
using System.Collections;

public class score : MonoBehaviour {

	public GameObject text;
	public int num;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		text.guiText.text = "Score: " + num;
	
	}
}
